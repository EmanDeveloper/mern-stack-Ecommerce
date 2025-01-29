import twilio from "twilio"
import dotenv from "dotenv"


dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSMS = async (to, body) => {
    try {
        await client.messages.create({
            body, // Message body
            to,   // Recipient's phone number
            from: fromPhone, // Twilio phone number from environment variables
        });
        console.log(`Message sent successfully: ${message.sid}`);
    } catch (error) {
        console.error(`Failed to send message: ${error.message}`);
    }
};


export default sendSMS;