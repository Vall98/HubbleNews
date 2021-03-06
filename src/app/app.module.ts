import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { InfinitescrollComponent } from './infinitescroll/infinitescroll.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    InfinitescrollComponent,
    NewsdetailsComponent,
    ToolbarComponent,
    MenuComponent,
    ProfileComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
