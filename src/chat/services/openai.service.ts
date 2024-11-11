import { Injectable } from '@nestjs/common';
import { LLMService } from '../interfaces/llm.interface';

// DIP 분석:
// 1. @Injectable() 데코레이터는 Nest.js의 DI 시스템에 이 클래스를 등록합니다.
// 2. 이 서비스는 LLMService 인터페이스를 구현하는 구체 클래스입니다.
// 3. 인터페이스 구현을 통해 다른 LLM 서비스로의 교체가 용이합니다.
// 4. Nest.js의 DI 컨테이너가 런타임에 적절한 구현체를 주입할 수 있게 합니다.
@Injectable()
export class OpenAIService implements LLMService {
  async generateResponse(prompt: string): Promise<string> {
    // 실제 OpenAI API 호출 로직
    return `OpenAI Response for: ${prompt}`;
  }
} 