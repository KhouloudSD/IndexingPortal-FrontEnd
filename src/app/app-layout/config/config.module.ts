import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigComponent } from './app-config.component';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [
    AppConfigComponent
  ],
  imports: [
    CommonModule,
        FormsModule,
        SidebarModule,
        ButtonModule,
        RadioButtonModule,
        InputSwitchModule
        
  ],
  exports: [
    AppConfigComponent
  ]
})
export class ConfigModule { }
