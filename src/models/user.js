import mongoose from "mongoose";

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
    address: {
        type: String,
        default: "",
    },
});

const userAdminSchema = new mongoose.Schema({
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
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        default: "",
    },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Admin =
    mongoose.models.Admin || mongoose.model("Admin", userAdminSchema);
