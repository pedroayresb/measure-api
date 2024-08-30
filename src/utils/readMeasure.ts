import gemini from "../gemini";

export default async function readMeasure(base64: string) {
  const mimeType = base64.split(";")[0].split(":")[1];

  const buffer = Buffer.from(base64.split(",")[1], "base64");

  const parts = [
    {
      text: `this is an image of a WATER or GAS meter. Please provide the value of the meter. The return only the number.`,
    },
    {
      inlineData: {
        mimeType,
        data: buffer.toString("base64"),
      },
    },
  ];

  const result = await gemini.generateContent({
    contents: [
      {
        role: "user",
        parts,
      },
    ],
  });

  return {
    geminiValue: result.response.text(),
  };
}
