import connect from "../../../../lib/mongoDB";
import User from "../../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../../../helpers/mailer";

export async function POST(req, res) {
    await connect();
    try {
        const body = await req.json();
        const { email, password } = body;
        console.log(body);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: `User already exist.` },
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        // send verification email
        await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });

        return NextResponse.json(
            {
                message: `User Registerd Successfully`,
                success: true,
                savedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
