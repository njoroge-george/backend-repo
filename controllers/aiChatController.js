import AIChat from "../models/AIChat.js";
import fetch from "node-fetch";

export const askAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Call OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();

        console.log("OpenAI API response:", data);

        // Make sure we actually have a choice
        if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
            return res.status(500).json({ error: "AI did not return a response" });
        }

        // Assign AI response properly
        const aiResponse = data.choices[0].message.content;

        // Save chat to DB
        const chat = await AIChat.create({
            userMessage: message,
            aiResponse,
        });

        res.json(chat);
    } catch (err) {
        console.error("Error in askAI:", err);
        res.status(500).json({ error: err.message });
    }

};


// Get all chat history
export const getChats = async (req, res) => {
    try {
        const chats = await AIChat.findAll({ order: [["createdAt", "DESC"]] });
        res.json(chats);
    } catch (err) {
        console.error("Error in getChats:", err);
        res.status(500).json({ error: err.message });
    }
};

// controllers/aiChatController.js

export const generateWorkoutImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-image-1",
                prompt,
                size: "512x512",
            }),
        });

        const data = await response.json();

        if (!data?.data?.length) {
            return res.status(500).json({ error: "AI did not return an image" });
        }

        res.json({ imageUrl: data.data[0].url });
    } catch (err) {
        console.error("Error generating workout image:", err);
        res.status(500).json({ error: err.message });
    }
};
