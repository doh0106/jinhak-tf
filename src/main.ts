// DI/DIP를 위한 핵심 설정
import 'reflect-metadata';  // 데코레이터 기반의 DI 시스템 활성화를 위한 필수 임포트
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestJS의 DI 컨테이너 초기화
  // AppModule을 루트로 하는 전체 의존성 트리 구성
  const app = await NestFactory.create(AppModule);

  // 전역 파이프를 통한 ValidationPipe 주입
  // DTO 유효성 검증을 위한 의존성을 애플리케이션 전체에 주입
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
}); 

