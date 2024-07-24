import Connection from "../../../database/config";
import User from "../../../models/user";

export const GET = async (req) => {
    await Connection();
    try {
        const user_id = req.headers.get('user_id');

        if (!user_id) {
            return new Response("User ID is required", { status: 400 });
        }

        const user = await User.findById(user_id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        const userData = {
            address: user.address,
            user_id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            terms: user.terms,
            ageConfirmation: user.ageConfirmation
        };
        return new Response(JSON.stringify({ userData }), { status: 200 });
    } catch (error) {
        console.error("Error from address catch:", error);
        return new Response("Internal server error", { status: 500 });
    }
}
