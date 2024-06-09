import { Component, OnInit } from '@angular/core';
import { Post, PostDto } from '../../data/post';
import { PostService } from '../../services/posts.service';
import { forkJoin } from 'rxjs';
import { PagedList } from '../../data/SPDocument';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

interface Status {
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
  posts : PostDto[] = [];
  selectedPostID!: string;
  selectedPost!: PostDto
  submitted : boolean = false;
  postDialog : boolean = false;
  statuses: any[] = [];
  cols : any[] = [];
  postDetails !: PostDto ;
  page =1;
  pageSize =12;
  totalCount =0;
  hasNextPage! : boolean ;
  hasPreviousPage!: boolean;
  routeItems: MenuItem[] = [];
  loading: boolean = false;  

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.loadPosts(1);
        console.log(this.postDialog)
        this.statuses = [
            { label: 'NEW', value: 'new' },
            { label: 'CLOSED', value: 'closed' },
        ];
    }
  
    initializeRouteItems() {
        this.routeItems = [
          { label: 'Informations', routerLink: ['PostDetails', this.selectedPostID] },
          { label: 'Documents', routerLink: ['PostAttachemnts', this.selectedPostID] }
        ];
    }

    hideDialog() {
      this.postDialog = false;
      this.submitted = false;
      this.selectedPostID = "";
      this.router.navigate([`/pages/posts`])
    }

    onRowSelect(event: any) {
      this.selectedPostID = event.data.id;
      if (this.selectedPostID) {
        this.initializeRouteItems();
        this.router.navigate([`/pages/posts/PostDetails/${this.selectedPostID}`]);
        this.postDialog = true;
      }
    }
    

    




    loadPosts(pageNumber: number): void {
      this.loading = true;  
      this.postService.getAllPosts1(pageNumber, this.pageSize)
        .subscribe((response: PagedList<PostDto>) => {
          this.posts = response.items;
          const statusObservables = this.posts.map(post => this.postService.getStatusCodeByPostId(post.id));
          forkJoin(statusObservables).subscribe(
            (statuses: any[]) => {
              this.posts.forEach((post, index) => {
                var statusCode = statuses[index];
                if (statusCode !== "CLOSED" && statusCode !== "NEW") { statusCode = "CLOSED"; }
                post.Status = statusCode;
                post.postDate = new Date(post.postDate);
              });
              this.loading = false;  
            },
            (error: any) => {
              console.error('Error fetching status codes:', error);
              this.loading = false;  
            }
          );
          this.totalCount = response.totalCount;
        },
        error => {
          console.error('Error fetching posts:', error);
          this.loading = false;  
        });
    }
  
    onPageChange(event: any): void {
      console.log(event.page);
      this.loadPosts(event.page + 1);
    }
  
  

   
}














/*
<div class="field">
                        <label for="status">Status</label>
                        <p-dropdown [(ngModel)]="post.Status" inputId="Status" optionValue="value" [options]="statuses" placeholder="Select">
                            <ng-template pTemplate="selectedItem">
                                <span *ngIf="post && post.Status" [class]="'product-badge status-' + post.Status.toLowerCase()">{{post.Status}}</span>
                            </ng-template>
                            <ng-template let-option pTemplate="item">
                                <span [class]="'product-badge status-' + option.value">{{option.label}}</span>
                            </ng-template>
                        </p-dropdown>
                    </div>
                    */