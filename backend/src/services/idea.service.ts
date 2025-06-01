import {
  aiGenerateCaptionByIdea,
  aiGenerateIdea,
} from "../helpers/gemini.helper";

class IdeaService {
  async createIdea(idea: string) {
    if (!idea) {
      throw new Error("Idea is required");
    }
    return await aiGenerateIdea(idea);
  }

  async createCaptionByIdea(idea: string) {
    if (!idea) {
      throw new Error("Idea is required");
    }
    return await aiGenerateCaptionByIdea(idea);
  }
}

export default new IdeaService();
