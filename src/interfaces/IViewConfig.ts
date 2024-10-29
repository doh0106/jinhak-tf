// SRP: ✅ 뷰의 표시 형식 설정만을 정의하는 단일 책임을 가짐
// OCP: ✅ 인터페이스로 정의되어 있어 다양한 설정 구현을 허용
export interface IViewConfig {
  headerFormat: string;
  itemFormat: string;
  footerFormat: string;
}
