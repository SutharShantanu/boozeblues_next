import Connection from "../../../database/config";
import User from "../../../models/user";

export const POST = async (NextRequest, NextResponse) => {
    await Connection();

    try {
        const body = await NextRequest.json();
        const { user_id, address } = body;

        if (!user_id || !address) {
            return new Response("User ID and address are required", {
                status: 400,
            });
        }

        const user = await User.findById(user_id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        user.address = address;
        await user.save();
        return new Response("Address updated successfully", {
            status: 200,
        });
    } catch (error) {
        console.error("Error from address catch:", error);
        return new Response("Internal server error", { status: 500 });
    }
};

export const GET = async (NextRequest, NextResponse) => {
    await Connection();

    try {
        const body = await NextRequest.json();
        const { user_id } = body;

        console.log(user_id);
        

        if (!user_id) {
            return new Response("User ID is required", {
                status: 400,
            });
        }

        const user = await User.findById(user_id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        const address = user.address || "";
        return new Response(JSON.stringify({ address }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error from address catch:", error);
        return new Response("Internal server error", { status: 500 });
    }
};