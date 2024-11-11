import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';

// DIP 분석:
// 1. @Module() 데코레이터는 Nest.js의 핵심 DI 컨테이너 구성 요소입니다.
// 2. imports를 통해 모듈 간의 의존성을 선언적으로 관리하며,
//    이는 모듈 레벨에서의 추상화와 의존성 관리를 가능하게 합니다.
// 3. Nest.js의 모듈 시스템은 DIP를 프레임워크 레벨에서 구현한 좋은 예시입니다.
@Module({
  imports: [ChatModule],
})
export class AppModule {} 