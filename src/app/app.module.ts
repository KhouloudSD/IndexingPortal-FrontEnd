import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppLayoutModule } from "./app-layout/app-layout.module";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    
    
    
    ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    FormsModule,
    CommonModule,
    AppLayoutModule,
    CommonModule,
    ButtonModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        CheckboxModule

      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
