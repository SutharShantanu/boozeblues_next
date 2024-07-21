// // pages/api/purchase.js

// import dbConnect from "../../lib/dbConnect";
// import User from "../../models/User";
// import Product from "../../models/Product";

// export default async function handler(req, res) {
//     await dbConnect();

//     if (req.method === "POST") {
//         const { userId, productId } = req.body;

//         try {
//             const user = await User.findById(userId);
//             const product = await Product.findById(productId);

//             if (!user || !product) {
//                 return res
//                     .status(404)
//                     .json({ message: "User or product not found" });
//             }

//             if (!user.address) {
//                 return res
//                     .status(400)
//                     .json({
//                         message: "Address is required to complete the purchase",
//                     });
//             }

//             // Proceed with purchase logic
//             // ...

//             res.status(200).json({
//                 message: "Purchase completed successfully",
//             });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: "Internal server error" });
//         }
//     } else {
//         res.status(405).json({ message: "Method not allowed" });
//     }
// }
