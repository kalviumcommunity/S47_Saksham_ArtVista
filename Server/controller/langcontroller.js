const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage } = require("@langchain/core/messages");
const dotenv = require('dotenv');

dotenv.config();

const modelName = "gemini-1.5-flash";

const generateDescription = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).send("Missing title");
  }

  if (!description) {
    return res.status(400).send("Missing description");
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(401).send("Missing Google API Key");
  }

  const vision = new ChatGoogleGenerativeAI({
    modelName,
    maxOutputTokens: 2048,
    apiKey,
  });

  const prompt = `Improve the description in 200 words, dont use bold italic or line breaks keep is simple para. Title: ${title}. Description: ${description}`;

  const input = [
    new HumanMessage({ content: prompt })
  ];

  try {
    const response = await vision.invoke(input);
    const content = response.content;
    // Assuming response has a text property
    res.json({ content });
    // console.log("Description generated successfully:", response);
  } catch (error) {
    console.error("Error generating description:", error);
    res.status(500).send("Error generating description");
  }
};

module.exports = {
  generateDescription,
};
