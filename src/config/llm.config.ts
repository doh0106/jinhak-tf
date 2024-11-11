import { Provider } from '@nestjs/common';
import { LLMService } from '../chat/interfaces/llm.interface';
import { OpenAIService } from '../chat/services/openai.service';
import { MockLLMService } from '../chat/services/mock-llm.service';

export const LLM_SERVICE = 'LLM_SERVICE';

export const llmProvider: Provider = {
  provide: LLM_SERVICE,
  useFactory: () => {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    return isDevelopment ? new MockLLMService() : new OpenAIService();
  }
}; 