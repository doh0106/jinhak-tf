// DIP 분석:
// 1. 이 인터페이스는 고수준 모듈과 저수준 모듈 사이의 추상화 계층을 제공합니다.
// 2. 컨트롤러(고수준)는 이 인터페이스에만 의존하며, 구체적인 구현체(OpenAI, Mock)는 알 필요가 없습니다.
// 3. 이는 DIP의 "추상화에 의존해야 하며, 구체화에 의존하면 안된다"는 원칙을 따릅니다.
export interface LLMService {
  generateResponse(prompt: string): Promise<string>;
} 