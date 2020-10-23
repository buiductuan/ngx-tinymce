import { TinymceComponent } from './ngx-tinymce.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TinymceOptions } from './tinymce-options.interface';
import { TinymceDefaultOptions } from './tinymce-default-options.interface';

@NgModule({
  declarations: [TinymceComponent],
  imports: [],
  exports: [TinymceComponent],
  providers: [
    { provide: 'TINYMCE_CONFIG', useClass: TinymceDefaultOptions }
  ]
})
export class TinymceModule {
  static withConfig(userConfig: TinymceOptions = {}): ModuleWithProviders {
    return {
      ngModule: TinymceModule,
      providers: [
        { provide: 'TINYMCE_CONFIG', useValue: userConfig }
      ]
    };
  }
}
