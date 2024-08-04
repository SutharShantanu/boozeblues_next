import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    terms: {
        type: Boolean,
        required: function () {
            return this.role === "user";
        },
    },
    ageConfirmation: {
        type: Boolean,
        required: function () {
            return this.role === "user";
        },
    },
    address: { type: String, default: "" },
    role: { type: String, default: "user" },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const User = mongoose.models?.User || mongoose.model('User', userSchema);
export default User;
