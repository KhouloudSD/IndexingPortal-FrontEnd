import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostRegistrationComponent } from './post-registration/post-registration.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { PostsComponent } from './posts/posts.component';
import { DropZoneComponent } from 'src/app/demo/pages/redaction/drop-zone/drop-zone.component';
import { RedactorComponent } from './redaction/redactor.component';
import { PostAttachmentsComponent } from 'src/app/demo/pages/posts/post-attachments/post-attachments.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';


export const PagesLayoutRoutes: Routes = [
  { path: '',      
    component: PostRegistrationComponent
  },
  { path: 'post-registration',      
    component: PostRegistrationComponent
  },
    { path: 'login',          
      component: LoginComponent ,
    },
    {  path: 'posts', component: PostsComponent, children: [
					{ path: '', redirectTo: 'PostDetails', pathMatch: 'full' },
					{ path: 'PostAttachemnts/:id', component: PostAttachmentsComponent },
					{ path: 'PostDetails/:id', component: PostDetailsComponent },
				]
		
  },
  { path: 'redaction',      
  component: RedactorComponent
  }
]

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule.forRoot(PagesLayoutRoutes)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }












