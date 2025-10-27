import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
    name?: string;
    email?: string;
    role?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    try {
        // Next automatically parses JSON body if the client sends application/json
        const body: Body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
        const { name = "", email = "", role = "" } = body;

        if (!email || !email.includes("@")) {
            return res.status(400).json({ success: false, error: "Valid email required" });
        }

        const apiKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.MAILERLITE_GROUP_ID;

        if (!apiKey || !groupId) {
            return res.status(500).json({ success: false, error: "Server missing MailerLite credentials" });
        }

        const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                fields: { name, role },
                groups: [groupId],
            }),
        });

        if (mlRes.ok) {
            return res.status(200).json({ success: true });
        } else {
            const text = await mlRes.text();
            return res.status(400).json({ success: false, error: text || "MailerLite error" });
        }
    } catch (err: any) {
        return res.status(500).json({ success: false, error: err?.message || "Unknown error" });
    }
}
