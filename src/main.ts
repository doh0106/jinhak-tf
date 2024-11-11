import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// DIP 분석:
// 1. NestFactory는 애플리케이션의 DI 컨테이너를 초기화하고 구성합니다.
// 2. create() 메서드 호출 시 전체 의존성 그래프가 구성되며,
//    모든 모듈, 프로바이더, 컨트롤러의 의존성이 해결됩니다.
// 3. Nest.js는 이 시점에서 토큰과 실제 구현체를 매핑하고,
//    전체 애플리케이션의 DI 트리를 구성합니다.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap(); 