import twilio from "twilio";
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} from "../common/constant";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function createMessage(phoneNumber: string, message: string) {
  const twilioMessage = await client.messages.create({
    body: message,
    from: TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });

  return twilioMessage;
}

export default createMessage;
