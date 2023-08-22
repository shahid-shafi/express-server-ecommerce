import { Twilio } from "twilio";
import dotenv from 'dotenv';
dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, TWILIO_VERIFY_SID } = process.env;

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendSMS = async (receiverNumber: string, message: string) => {
    const smsBody: any = {
        to: receiverNumber,
        from: TWILIO_PHONE_NUMBER,
        body: message,
    }

    return await client.messages.create(smsBody);
}
