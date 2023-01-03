import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HeaderModule } from './modules/header/header.module';
registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, HeaderModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
