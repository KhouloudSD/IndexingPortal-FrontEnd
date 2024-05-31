import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ConfigModule } from './config/config.module';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppMenuitemComponent } from './app-menu/app.menuitem.component';


@NgModule({
  declarations: [
    AppLayoutComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppMenuitemComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
        FormsModule,
        ConfigModule,
        SidebarModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class AppLayoutModule { }
