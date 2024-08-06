import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    terms: {
        type: Boolean,
        required: true,
    },
    ageConfirmation: {
        type: Boolean,
        required: true,
    },
    address: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenEpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
