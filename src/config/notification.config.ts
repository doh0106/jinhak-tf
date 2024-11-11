// DI: 설정 값들을 중앙화하고 의존성으로 주입하기 위한 타입 정의
// 1. 각 알림 서비스별 설정을 인터페이스로 명확히 정의
// 2. 설정 변경 시 이 인터페이스만 수정하면 됨 (단일 책임 원칙)
export interface NotificationConfig {
  email: {
    host: string;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  };
  sms: {
    apiKey: string;
    apiSecret: string;
  };
  push: {
    projectId: string;
    privateKey: string;
  };
}

// DI: 환경변수를 통한 설정 주입의 기본값 정의
// 1. 환경변수를 통한 동적 설정 주입 지원
// 2. 기본값을 통한 안전한 폴백 메커니즘 제공
// 3. 각 서비스의 설정을 중앙에서 관리하여 유지보수성 향상
export const defaultConfig: NotificationConfig = {
  email: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || ''
    }
  },
  sms: {
    apiKey: process.env.SMS_API_KEY || '',
    apiSecret: process.env.SMS_API_SECRET || ''
  },
  push: {
    projectId: process.env.PUSH_PROJECT_ID || '',
    privateKey: process.env.PUSH_PRIVATE_KEY || ''
  }
}; 