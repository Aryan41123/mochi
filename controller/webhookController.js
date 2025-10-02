import { Webhook } from "svix";
import User from "../models/User.js";

export const handleClerkWebhook = async (req, res) => {
  const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    evt = svix.verify(req.rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  const { type, data } = evt;

  try {
    if (type === "user.created") {
      const email = data.email_addresses?.[0]?.email_address || "";
      const fallbackName = email.split("@")[0];

      const userData = {
        clerkId: data.id,
        name: data.first_name?.trim() || fallbackName,
        email,
        imageUrl: data.image_url || "",
        profileImageUrl: data.profile_image_url || "",
        createdAt: new Date(data.created_at),
      };

      const existingUser = await User.findOne({ clerkId: userData.clerkId });

      if (!existingUser) {
        const newUser = new User(userData);
        await newUser.save();
        console.log("✅ User created & stored:", newUser.email);
      } else {
        console.log("ℹ️ User already exists:", existingUser.email);
      }
    }

    if (type === "user.deleted") {
      const deletedUser = await User.findOneAndDelete({ clerkId: data.id });
      console.log("🗑️ User deleted:", deletedUser?.email || data.id);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook handling error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};