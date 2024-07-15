
// export async function POST(NextRequest) {
//   try {
//     const reqBody = await NextRequest.json();
//     const { email, password } = reqBody;
//     console.log(reqBody);

//     //check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { error: "User does not exist" },
//         { status: 400 }
//       );
//     }
//     console.log("user exists");

//     //check if password is correct
//     const validPassword = await bcryptjs.compare(password, user.password);
//     if (!validPassword) {
//       return NextResponse.json({ error: "Invalid password" }, { status: 400 });
//     }
//     console.log(user);

//     //create token data
//     const tokenData = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     };
//     //create token
//     const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
//       expiresIn: "1d",
//     });

//     const response = NextResponse.json({
//       data: tokenData,
//       userToken: token,
//       message: "Login successful",
//       success: true,
//     });
//     response.cookies.set("token", token, {
//       httpOnly: true,
//     });
//     return response;
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

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
            return new Response("Invalid email or password", { status: 400 });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return new Response("Invalid email or password", { status: 400 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error from login catch:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

