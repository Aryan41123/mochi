import User from '../models/User.js'


export const getUserByClerkId = async (req, res) => {
    const { clerkId } = req.params
    try {
        const user = await User.findOne({ clerkId })
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ success: true, user });

    } catch (error) {
        console.error("❌ Error fetching user:", err.message);
        res.status(500).json({ error: "DB error" });
    }
}