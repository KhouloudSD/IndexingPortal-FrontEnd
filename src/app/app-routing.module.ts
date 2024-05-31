import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { PagesComponent } from './demo/pages/pages.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([

    {
      path: 'pages',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/demo/pages/pages.module').then(m => m.PagesModule)
      }
    ]
    }
    
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }

