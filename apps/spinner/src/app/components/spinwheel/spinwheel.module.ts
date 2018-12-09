import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SpinwheelComponent } from './spinwheel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SpinwheelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [SpinwheelComponent],
})
export class SpinwheelModule {}
