import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { llmProvider } from '../config/llm.config';

// DIP 분석:
// 1. @Module() 데코레이터를 통해 Nest.js의 DI 컨테이너에 바인딩할 요소들을 선언합니다.
// 2. providers 배열에 llmProvider를 등록함으로써, 
//    인터페이스와 구현체 간의 바인딩을 모듈 레벨에서 설정합니다.
// 3. controllers 배열의 컨트롤러들은 providers에 등록된 서비스들을 
//    생성자 주입을 통해 자동으로 제공받습니다.
@Module({
  controllers: [ChatController],
  providers: [llmProvider]
})
export class ChatModule {} 