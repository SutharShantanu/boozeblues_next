// import Connection from "../../../database/config";
// import User from "../../../models/user";

// export const POST = async (NextRequest, NextResponse) => {
//     await Connection();
//     const body = await NextRequest.json();
//     const { email, address } = body;

//     try {
//         if (!email || !address) {
//             return new Response("Email and address are required", {
//                 status: 400,
//             });
//         }
//         const user = await User.findOne({ email });

//         if (!user) {
//             return new Response("User not found", { status: 404 });
//         }

//         user.address = address;
//         await user.save();
//         return new Response("Address updated successfully", {
//             status: 200,
//         });
//     } catch (error) {
//         console.error("Error from address catch:", error);
//         return new Response("Internal server error", { status: 500 });
//     }
// };

// export const GET = async (NextRequest, NextResponse) => {
//     await Connection();
//     const { email } = NextRequest.query;

//     try {
//         if (!email) {
//             return new Response("Email is required", {
//                 status: 400,
//             });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return new Response("User not found", { status: 404 });
//         }

//         const address = user.address || "";
//         return new Response(JSON.stringify({ address }), {
//             status: 200,
//         });
//     } catch (error) {
//         console.error("Error from address catch:", error);
//         return new Response("Internal server error", { status: 500 });
//     }
// };
