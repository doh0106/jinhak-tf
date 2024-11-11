import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { llmProvider } from '../config/llm.config';

@Module({
  controllers: [ChatController],
  providers: [llmProvider]
})
export class ChatModule {} 