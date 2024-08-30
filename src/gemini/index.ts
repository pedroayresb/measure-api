import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const gemini = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export default gemini;
