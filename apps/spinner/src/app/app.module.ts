import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';
import { SpinwheelModule } from './components/spinwheel/spinwheel.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SpinwheelModule,
    NxModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
