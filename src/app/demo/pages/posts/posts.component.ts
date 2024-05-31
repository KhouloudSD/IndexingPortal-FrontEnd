import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Post } from '../../data/post';
import { PostService } from '../../services/posts.service';

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
            { field: 'Status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'NEW', value: 'new' },
            { label: 'CLOSED', value: 'closed' },
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













/*

 [POST_Id]
      ,[POST_TimeStamp]
      ,[POST_PostNumber]   this 
      ,[POST_PostDate]    this 
      ,[POST_PostReference]   this
      ,[POST_EmailFrom]   this 
      ,[POST_EmailTo]   this 
      ,[POST_EmailCC]    this
      ,[POST_EmailSubject]   this 
      ,[POST_EmailMessage]  this
      ,[POST_SendDate]   this
      ,[POST_ReceiveDate]  this
      ,[POST_Comments]
      ,[POST_CommunicationType_Id]
      ,[POST_PostHandlingPriority_Id]
      ,[POST_IndexingDate]
      ,[POST_IndexingArchive_Id]
      ,[POST_LegalEntity_Id]
      ,[POST_Department_Id]
      ,[POST_Employee_Id]
      ,[POST_Dossier_Id]   this 
      ,[POST_DossierAssignment_Id]
      ,[POST_DossierParty_Id]
      ,[POST_OriginalDocument_Id]
      ,[POST_IsBodilyInjury]
      ,[POST_CreatedDate]
      ,[POST_CreatedBy]
      ,[POST_LastModifiedDate]
      ,[POST_LastModifiedBy]
      ,[POST_Inactive]
      ,[POST_HasAttachments]  this 


*/