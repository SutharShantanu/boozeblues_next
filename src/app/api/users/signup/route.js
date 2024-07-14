import User from "../../../../models/user";
import bcrypt from "bcrypt";
import Connection from "../../../database/config";

Connection();

export const POST = async (NextRequest, NextResponse) => {
    try {
        const body = await NextRequest.json();
        const {
            fullName,
            email,
            password,
            confirmPassword,
            phoneNumber,
            terms,
            ageConfirmation,
        } = body;

        if (
            !fullName ||
            !email ||
            !password ||
            !confirmPassword ||
            !phoneNumber ||
            !terms ||
            !ageConfirmation
        ) {
            return new Response(`fileds shouldn't be empty`, { status: 401 });
        }

        const user = await User.findOne({ email });
        if (user) {
            return new Response(`user already exist!`, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(password, 4);
        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            terms,
            ageConfirmation,
        });

        await newUser.save();

        return new Response(`User has been registered`, { status: 200 });

    } catch (error) {
        return console.log(`error from signup catch`, error);
    }
};
