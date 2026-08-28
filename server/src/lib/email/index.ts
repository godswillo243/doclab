import { createTransport } from "nodemailer";
import { env } from "../../config/env";
import { emailVerificationTemplate } from "./templates/email-verification";

interface SendMailProps {
  to: string;
  subject: string;
  html: string;
}

const transporter = createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: Number(env.SMTP_PORT) === 465,
  service: env.SMTP_SERVICE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export const verifySMTP = () => {
  transporter
    .verify()
    .then(() => console.log("SMTP Active"))
    .catch((err) => console.error(err));
};

export const sendEmail = async ({ to, subject, html }: SendMailProps) => {
  try {
    const result = (await transporter.sendMail({
      from: env.SMTP_FROM,
      to,
      subject,
      html,
    })) as unknown;
    return result;
  } catch (error) {
    console.error(`Failed to send email ${{ error }}`);
    throw error;
  }
};

export const sendVerificationEmail = async (
  email: string,
  username: string,
  code: string,
) => {
  return sendEmail({
    to: email,
    subject: "Verify your Notey account",
    html: emailVerificationTemplate({
      username,
      code,
    }),
  });
};
