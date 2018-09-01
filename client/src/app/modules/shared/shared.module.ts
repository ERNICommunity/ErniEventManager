import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    TranslateModule,
    NgbModule
  ]
})

export class SharedModule { }
