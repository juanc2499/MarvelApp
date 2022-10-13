import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './components/characters/characters.component';
import { ListComponent } from './list/list/list.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { FilterComponent } from './filter/filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './shared/components/spinner/Interceptor/spinner.interceptor';
import { InfoCharacterComponent } from './infoCharacter/info-character/info-character.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    ListComponent,
    NavbarComponent,
    FilterComponent,
    InfoCharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    SpinnerModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
