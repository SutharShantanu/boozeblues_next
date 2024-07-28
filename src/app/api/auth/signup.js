import connectToDatabase from "../../../lib/mongoose";
import { User } from "../../../models/user";
import bcrypt from "bcrypt";

const handler = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const { name, email, password } = req.body;

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created" });
};

export default handler;
