import { IViewConfig } from '../interfaces/IViewConfig';

export class ViewConfigFactory {
  static createDefaultConfig(): IViewConfig {
    return {
      headerFormat: '\n=== Todo List ===',
      itemFormat: '[{status}] {title} (ID: {id})',
      footerFormat: '================\n'
    };
  }
}
