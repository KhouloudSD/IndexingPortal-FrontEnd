import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PagesLayoutRoutes, PagesRoutingModule } from './pages.routing.module';
import { RouterModule } from '@angular/router';
import { PostRegistrationComponent } from './post-registration/post-registration.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitterModule } from 'primeng/splitter';
import { PostsComponent } from './posts/posts.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { MessageModule } from 'primeng/message';

import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from '../services/posts.service';
import { PaginatorModule } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { DropZoneComponent } from 'src/app/demo/pages/redaction/drop-zone/drop-zone.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { RedactorComponent } from './redaction/redactor.component';

@NgModule({
  declarations: [
    PostRegistrationComponent,
    PostsComponent,
    LoginComponent,
    PagesComponent,
    RedactorComponent,
    DropZoneComponent,
  ],
  providers: [PostService, MessageService],

  imports: [
    DropzoneModule,
    CommonModule,
    PaginatorModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    TableModule,
    CheckboxModule,
    SplitterModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    ToolbarModule,
    RatingModule,
    RippleModule,
    FileUploadModule,
    DialogModule,
		ToastModule,
		MessagesModule,
		MessageModule,

    RouterModule.forChild(PagesLayoutRoutes),
  ]
})
export class PagesModule { }


/*



CommonModule,
        CrudRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule

*/