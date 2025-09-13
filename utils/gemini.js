import "dotenv/config";
import axios from "axios";

const getGenAPIResponse = async (message) => {
  if (!message) throw new Error("Message is required");

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GOOGLE_API_KEY,
        },
      }
    );

    // Extract the generated text
    const candidate = response.data?.candidates?.[0];
    const text =
      candidate?.content?.parts?.[0]?.text ||
      (Array.isArray(candidate?.content) &&
        candidate.content[0]?.parts?.[0]?.text) ||
      "No response from Gemini API";

    return text.trim();
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error("Failed to get response from Gemini API");
  }
};

export default getGenAPIResponse;
