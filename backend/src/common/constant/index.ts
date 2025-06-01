require("dotenv").config();

export const PORT = process.env.PORT || 3000;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
export const ACCESS_TOKEN_EXPIRED = process.env.ACCESS_TOKEN_EXPIRED || "1d";

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "";
