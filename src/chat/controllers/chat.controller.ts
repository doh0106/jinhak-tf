import { Controller, Post, Body, Inject } from '@nestjs/common';
import { LLMService } from '../interfaces/llm.interface';
import { LLM_SERVICE } from '../../config/llm.config';

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