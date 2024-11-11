import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from './config/config.module';

// @Module 데코레이터를 통한 모듈 정의
// DI 컨테이너의 최상위 모듈로서 전체 의존성 그래프의 진입점 역할
@Module({
  imports: [
    ConfigModule.forRoot(), // 동적 모듈을 통한 설정 주입 - 런타임에 설정값 동적 주입 가능
    NotificationModule     // 알림 기능 모듈 주입 - 느슨한 결합을 통한 모듈성 확보
  ],
})
export class AppModule {} 