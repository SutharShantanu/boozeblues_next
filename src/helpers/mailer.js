import nodemailer from "nodemailer";
import User from "../models/user";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userID }) => {
    try {
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenEpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "7c1d68966df350", // ❌
                pass: "656497034385d8", // ❌
            },
        });

        const mailOptions = {
            from: "shantanusut2000@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? `Verify your email`
                    : `Reset your password`,
            html: `<p>Click <a href="{process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
            } or copy and paste the link below in your browser.<br>${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}</р>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        throw new Error(error);
    }
};
