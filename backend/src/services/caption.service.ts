import { aiGenerateCaption } from "../helpers/gemini.helper";
import { CaptionModel } from "../models/caption.model";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";

class CaptionService {
  async generateCaption(socialMedia: string, subject: string, tone: string) {
    if (!socialMedia || !subject || !tone) {
      throw new Error("Social media, subject, and tone are required");
    }

    return await aiGenerateCaption(socialMedia, subject, tone);
  }

  async createCaption({
    topic,
    content,
    phoneNumber,
  }: {
    topic: string;
    content: string;
    phoneNumber: string;
  }) {
    if (!content) {
      throw new Error("Content is required");
    }
    if (!topic) {
      throw new Error("Topic is required");
    }

    const caption = CaptionModel.parse({
      id: uuidv4(),
      topic,
      content,
      phoneUser: phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await db.collection("captions").doc(caption.id).set(caption);

    return caption;
  }

  async getCaptions(phoneNumber: string) {
    const captions = await db
      .collection("captions")
      .where("phoneUser", "==", phoneNumber)
      .get();

    return captions.docs.map((doc) => doc.data());
  }

  async deleteCaption(id: string, phoneNumber: string) {
    const caption = await db.collection("captions").doc(id).get();
    if (!caption.exists) {
      throw new Error("Caption not found");
    }
    if (caption.data()?.phoneUser !== phoneNumber) {
      throw new Error("You are not authorized to delete this caption");
    }
    await db.collection("captions").doc(id).delete();
    return true;
  }
}

export default new CaptionService();
