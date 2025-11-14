
import { GoogleGenAI, Type } from "@google/genai";
import { LeaveType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const leaveTypeSchema = {
  type: Type.OBJECT,
  properties: {
    leaveType: {
      type: Type.STRING,
      description: 'The suggested leave type.',
      enum: Object.values(LeaveType),
    },
  },
  required: ['leaveType'],
};

export const suggestLeaveType = async (reason: string): Promise<LeaveType | null> => {
  if (!reason || reason.trim().length < 10) {
    return null;
  }

  try {
    const prompt = `Analyze the following reason for leave and classify it into one of these categories: "Annual", "Sick", or "Unpaid". Reason: "${reason}"`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: leaveTypeSchema,
      },
    });

    const jsonText = response.text.trim();
    if (jsonText) {
      const parsed = JSON.parse(jsonText);
      const suggestedType = parsed.leaveType as LeaveType;
      if (Object.values(LeaveType).includes(suggestedType)) {
        return suggestedType;
      }
    }
    return null;
  } catch (error) {
    console.error("Error suggesting leave type:", error);
    return null;
  }
};
