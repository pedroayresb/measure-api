import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import readMeasure from "../../../src/utils/readMeasure";
import gemini from "../../../src/gemini";
import mocks from "../../mocks";

describe("Read Measure", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the measure", async () => {
    gemini.model.generateContent = jest.fn(async () => ({
      response: {
        text: () => "123",
      },
    })) as unknown as typeof gemini.model.generateContent;

    const measureRead = await readMeasure.read(mocks.image);

    expect(measureRead).toEqual({
      geminiValue: 123,
    });
  });

  it("should throw an error if the geminiValue is NaN", async () => {
    gemini.model.generateContent = jest.fn(async () => ({
      response: {
        text: () => "afsdgfasdfdasdfssdfasdf",
      },
    })) as unknown as typeof gemini.model.generateContent;

    await expect(readMeasure.read(mocks.image)).rejects.toThrow("INVALID_DATA");
  });
});
