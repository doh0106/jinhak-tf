import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// DI/DIP: 데이터 전송 객체를 통한 계층 간 결합도 감소
// 1. Controller와 Service 계층 사이의 데이터 전달 표준화
// 2. class-validator를 통한 유효성 검증 책임 분리
// 3. 인터페이스 대신 클래스를 사용하여 런타임에서 DI 활용 가능
export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsNotEmpty()
  content: string;
} 