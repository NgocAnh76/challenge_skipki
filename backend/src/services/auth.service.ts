import { db } from "../firebase";
import jwt, { SignCallback } from "jsonwebtoken";
import createMessage from "../helpers/twilio.helper";
import { UserModel } from "../models/user.model";
import { ACCESS_TOKEN_SECRET } from "../common/constant";
import { ACCESS_TOKEN_EXPIRED } from "../common/constant";

class AuthService {
  async generateAccessCode(phoneNumber: string) {
    if (!phoneNumber) {
      throw new Error("Phone number is required");
    }

    const accessCode = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const userExists = await db.collection("users").doc(phoneNumber).get();

    if (userExists.exists) {
      // update the access code
      await db
        .collection("users")
        .doc(phoneNumber)
        .update({
          accessCode: {
            code: accessCode,
            expiresAt,
          },
          updatedAt: new Date(),
        });
    } else {
      const userModel = UserModel.parse({
        id: phoneNumber,
        phoneNumber,
        accessCode: {
          code: accessCode,
          expiresAt,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // create a new user
      await db.collection("users").doc(phoneNumber).set(userModel);
    }
    await createMessage(phoneNumber, `Your access code is ${accessCode}`);

    // Since twilio free version doesn't send messages to some countries, log AccessCode to get code verify
    console.log("🚀 ~ AuthController ~ AccessCode:", accessCode);
    return true;
  }

  async validateCode(phoneNumber: string, code: string) {
    const parsedCode = parseInt(code);
    if (!phoneNumber || !code) {
      throw new Error("Phone number and code are required");
    }
    const user = await db.collection("users").doc(phoneNumber).get();
    if (!user.exists) {
      throw new Error("User not found");
    }
    const userData = user.data();

    if (userData?.accessCode?.code !== parsedCode) {
      throw new Error("Invalid code");
    }

    const expiresAt = userData?.accessCode?.expiresAt?.toDate();

    if (expiresAt < new Date()) {
      throw new Error("Code expired");
    }
    return this.createToken(phoneNumber);
  }

  async createToken(phoneNumber: string) {
    if (!phoneNumber) {
      throw new Error("Phone number is required");
    }
    const accessToken = jwt.sign({ phoneNumber }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRED as any,
    });
    return accessToken;
  }
}

export default new AuthService();
