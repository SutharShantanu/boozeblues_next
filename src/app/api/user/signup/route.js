import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoDB";
import User from "../../../../models/user";
import bcryptjs from "bcryptjs";

export const POST = async (request) => {
    await connectDB();

    try {
        const body = await request.json();

        const { email, password } = body;
        console.log(body);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: `User already exists.` },
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
        // await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });

        return NextResponse.json(
            {
                message: `User Registered Successfully`,
                success: true,
                savedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};