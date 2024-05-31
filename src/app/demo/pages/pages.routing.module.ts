import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostRegistrationComponent } from './post-registration/post-registration.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { PostsComponent } from './posts/posts.component';
import { DropZoneComponent } from 'src/app/demo/pages/redaction/drop-zone/drop-zone.component';
import { RedactorComponent } from './redaction/redactor.component';


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
    { path: 'posts',      
    component: PostsComponent
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












