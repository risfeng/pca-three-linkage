import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';//导入动画模块
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//导入PrimeNg的dropdown组件模块
import { DropdownModule } from 'primeng/primeng';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    JsonpModule,
    BrowserModule,
    FormsModule,//一定要导入forms模块
    BrowserAnimationsModule,//导入动画模块
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
