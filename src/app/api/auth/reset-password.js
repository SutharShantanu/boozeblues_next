// import connectToDatabase from "../../../lib/mongodb";

// import crypto from "crypto";
// import { sendResetPasswordEmail } from "../../../lib/nodemailer";

// export const ResetPasswrod = async (req, res) => {
//     await connectToDatabase();

//     if (req.method === "POST") {
//         const { email } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const token = crypto.randomBytes(32).toString("hex");
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//         await user.save();

//         await sendResetPasswordEmail(email, token);
//         res.status(200).json({ message: "Password reset email sent" });
//     }
// };
