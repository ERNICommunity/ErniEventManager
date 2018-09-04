import { Component, NgModule } from '@angular/core';

@Component({
  template: ''
})
export class MockComponent { }

@NgModule({
  declarations: [MockComponent],
  exports:      [MockComponent]
})
export class MockModule { }
