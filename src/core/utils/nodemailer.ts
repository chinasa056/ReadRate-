import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { logger } from "./logger";

import { MailOptions } from "../interfaces/mailer";

export const sendMail = async (options: MailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE || "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL || "hizikex@gmail.com",
      pass: process.env.APP_PASSWORD || "lmpjwcwkemwpmtak",
    },
  });

  const mail = {
    from: {
      name: "STACKOVERFLOW",
      address: process.env.USER || "hizikex@gmail.com",
    },
    ...options,
  };

  try {
    await transporter.sendMail(mail);
    logger.info("Email sent successfully");
  } catch (error) {
    logger.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
export { MailOptions };
