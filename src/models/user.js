import mongoose from "mongoose";
import { type } from "os";
import { boolean, number } from "zod";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
    },
    terms: {
        type: Boolean,
        required: true,
    },
    ageConfirmation: {
        type: Boolean,
        required: true,
    },
});

const User = mongoose.model.user || mongoose.model("user", userSchema);

export default User;
