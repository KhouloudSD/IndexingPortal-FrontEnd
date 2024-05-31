import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Post } from '../../data/post';
import { PostService } from '../../services/posts.service';

interface InventoryStatus {
  label: string;
  value: string;
}


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})



export class PostsComponent  implements OnInit{
  post : Post  = {};
  posts : Post[] = [];
  submitted : boolean = false;
  postDialog : boolean = false;
  statuses: any[] = [];
  cols : any[] = []

  
  constructor(private postService: PostService) { }

    ngOnInit() {
        this.posts = []

        this.cols = [
            { field: 'PostId', header: 'PostId' },
            { field: 'EmailSubject', header: 'EmailSubject' },
            { field: 'Dossier_Id', header: 'Dossier_Id' },
            { field: 'HasAttachments', header: 'HasAttachments' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

  openNew() {
    this.post = {};
    this.submitted = false;
    this.postDialog = true;
}
  hideDialog() {
    this.postDialog = false;
    this.submitted = false;

}


}













