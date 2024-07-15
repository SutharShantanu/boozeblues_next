import User from "../../../../models/user";
import bcrypt from "bcrypt";
import Connection from "../../../../database/config";

export const POST = async (NextRequest, NextResponse) => {
  await Connection();

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
      return new Response("Fields shouldn't be empty", { status: 401 });
    }

    const user = await User.findOne({ email });
    if (user) {
      return new Response("Account Already Exists", { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 4);
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      confirmPassword,
      password: hashedPassword,
      terms,
      ageConfirmation,
    });

    await newUser.save();

    return new Response("User has been registered", { status: 200 });
  } catch (error) {
    console.error("Error from signup catch:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
