import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
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

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
