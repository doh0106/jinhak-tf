import { Controller, Post, Body, Inject } from '@nestjs/common';
import { LLMService } from '../interfaces/llm.interface';
import { LLM_SERVICE } from '../../config/llm.config';
// DIP 분석:
// 1. @Inject() 데코레이터는 Nest.js의 DI 시스템을 통해 의존성을 주입받습니다.
// 2. 컨트롤러는 LLMService 인터페이스에만 의존하며, 
//    실제 구현체(OpenAI/Mock)에 대해 알지 못합니다.
// 3. LLM_SERVICE 토큰을 사용하여 간접적으로 의존성을 주입받음으로써,
//    DIP의 추상화 원칙을 준수합니다.
// 4. 생성자 주입 패턴을 사용하여 의존성을 명시적으로 선언합니다.
@Controller('chat')
export class ChatController {
  constructor(
    @Inject(LLM_SERVICE)
    private readonly llmService: LLMService
  ) {}

  @Post()
  async chat(@Body('message') message: string) {
    const response = await this.llmService.generateResponse(message);
    return { response };
  }
} 