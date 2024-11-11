import { Injectable } from '@nestjs/common';
import { LLMService } from '../interfaces/llm.interface';

@Injectable()
export class MockLLMService implements LLMService {
  async generateResponse(prompt: string): Promise<string> {
    return `Mock Response for: ${prompt}`;
  }
} 