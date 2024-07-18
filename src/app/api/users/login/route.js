import User from "../../../../models/user";
import bcrypt from "bcrypt";
import Connection from "../../../../database/config";
import jwt from "jsonwebtoken";

export const POST = async (NextRequest, NextResponse) => {
    await Connection();

    try {
        const body = await NextRequest.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response("Fields shouldn't be empty", { status: 401 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return new Response("No user found", { status: 400 });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return new Response("Invalid email or password", { status: 400 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
            expiresIn: "1h",
        });

        return new Response(
            JSON.stringify({ message: "Login successful", token, email }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error from login catch:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
