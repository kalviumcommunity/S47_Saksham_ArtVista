const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage } = require("@langchain/core/messages");
const dotenv = require('dotenv');

dotenv.config();

const modelName = "gemini-pro-vision";

const generateDescription = async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).send("Missing text or image URL");
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

  const input = [
    new HumanMessage({ 
      content: [
        {
          type: "text",
          text: "Describe the image in 300 words",
        },
        {
          type: "image_url",
          image_url: image,
        },
      ],
    }),
  ];

  try {
    const response = await vision.invoke(input);
    
    console.log(response);
    
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating description");
  }
};

module.exports = {
  generateDescription,
};