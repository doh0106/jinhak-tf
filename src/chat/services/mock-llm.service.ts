import { Injectable } from '@nestjs/common';
import { LLMService } from '../interfaces/llm.interface';

// DIP 분석:
// 1. OpenAIService와 동일한 인터페이스를 구현하여 서비스 교체가 가능합니다.
// 2. 테스트 환경에서 실제 서비스를 대체할 수 있는 좋은 예시입니다.
// 3. Nest.js의 @Injectable()을 통해 DI 컨테이너에서 관리됩니다.
@Injectable()
export class MockLLMService implements LLMService {
  async generateResponse(prompt: string): Promise<string> {
    return `Mock Response for: ${prompt}`;
  }
} 