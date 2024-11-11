import { Module, DynamicModule } from '@nestjs/common';
import { NotificationConfig, defaultConfig } from './notification.config';

// DI: 동적 모듈을 통한 설정 주입 메커니즘
// 1. 모듈 자체가 DI 컨테이너에 의해 관리됨
// 2. forRoot 메서드를 통한 동적 설정 주입 지원
@Module({})
export class ConfigModule {
  // DI: 동적 모듈 패턴 구현
  // 1. 런타임에 설정을 주입할 수 있는 유연한 구조
  // 2. 전역 설정을 단일 지점에서 관리 (싱글톤 패턴)
  static forRoot(config: Partial<NotificationConfig> = {}): DynamicModule {
    const configProvider = {
      provide: 'NOTIFICATION_CONFIG',  // DI 토큰 정의
      useValue: {                      // 설정값 주입
        ...defaultConfig,
        ...config,
      },
    };

    return {
      module: ConfigModule,
      providers: [configProvider],     // DI 컨테이너에 프로바이더 등록
      exports: [configProvider],       // 다른 모듈에서 사용할 수 있도록 export
      global: true,                    // 전역 모듈로 설정
    };
  }
}