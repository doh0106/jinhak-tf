import { Provider } from '@nestjs/common';
import { LLMService } from '../chat/interfaces/llm.interface';
import { OpenAIService } from '../chat/services/openai.service';
import { MockLLMService } from '../chat/services/mock-llm.service';

export const LLM_SERVICE = 'LLM_SERVICE';

// DIP 분석:
// 1. Nest.js의 Custom Provider 패턴을 사용하여 동적으로 구현체를 선택합니다.
// 2. useFactory 패턴은 Nest.js가 제공하는 고급 DI 기능으로, 
//    환경에 따라 다른 구현체를 주입할 수 있게 해줍니다.
// 3. 토큰(LLM_SERVICE)을 통한 추상화된 주입 지점을 제공합니다.
export const llmProvider: Provider = {
  provide: LLM_SERVICE,
  useFactory: () => {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    return isDevelopment ? new MockLLMService() : new OpenAIService();
  }
}; 