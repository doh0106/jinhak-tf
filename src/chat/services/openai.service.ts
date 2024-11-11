import { Injectable } from '@nestjs/common';
import { LLMService } from '../interfaces/llm.interface';

@Injectable()
export class OpenAIService implements LLMService {
  async generateResponse(prompt: string): Promise<string> {
    // 실제 OpenAI API 호출 로직
    return `OpenAI Response for: ${prompt}`;
  }
} 