import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Scroller } from 'primeng/scroller';
import { Splitter } from 'primeng/splitter';
import { PostDto, PostInfoDto } from '../../data/post';
import { PostService } from '../../services/posts.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Message, MessageService } from 'primeng/api';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-registration',
  templateUrl: './post-registration.component.html',
  styleUrls: ['./post-registration.component.css'],
  providers: [MessageService , PostService]
})
export class PostRegistrationComponent implements OnInit {
  @ViewChild('sc') sc!: Scroller;
  @ViewChild('splitter') splitter!: Splitter;
  @ViewChild('scroller') scroller!: ElementRef;
  dossierNumber: string = '';
  scrollerHeight: string = '510px'; // Define scrollerHeight property
  postInfoList: PostInfoDto[] = [];
  keyword: string = '';
  filteredPostInfoList: PostInfoDto[] = [];
  selectedPost : PostInfoDto | undefined ;
  postDetails !: PostDto ;
  body: SafeHtml = '';
  textcontent : any;
  visible: boolean = false;
  msgs: Message[] = [];
  emailSubject: string = '';



  constructor( private messageService : MessageService, private sanitizer: DomSanitizer,private renderer: Renderer2 , private postService: PostService ) {}

  ngOnInit(): void {
    this.getAllPostInfo();
    if (this.splitter && this.splitter.panels && this.splitter.panels.length > 0){
      this.onResize({panel: this.splitter.panels[0]});
    }
}



  clearSearch(): void {
    this.keyword = '';
    this.filteredPostInfoList = this.postInfoList;
  }

  search(): void {
    this.filteredPostInfoList = this.postInfoList.filter(post => {
      // Adjust the conditions based on your search criteria
      return post.emailSubject.toLowerCase().includes(this.keyword.toLowerCase()) ||
             post.emailFrom.toLowerCase().includes(this.keyword.toLowerCase());
    });
  }

  selectPost(post: PostInfoDto): any {
    this.selectedPost = post;
    this.getPostDetails(this.selectedPost.id);
  }

  extractTextFromHTML(htmlContent: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const textContent = doc.body.textContent || ''; // Extract text content from the body
    const formattedTextContent = textContent
      .trim() // Trim any leading or trailing whitespace
      .replace(/(?:\r\n|\r|\n)/g, '<br>'); // Replace newline characters with <br> tags
    return formattedTextContent;
  }

getPostDetails(postId: string): void {
  this.postService.getPostDetails(postId).subscribe(
    (data: PostDto) => {
      this.postDetails = data;
      // Fetch status code and assign it
      this.postService.getStatusCodeByPostId(postId).subscribe(
        (statusCode: any ) => {
          this.postDetails.Status = statusCode;
        },
        (error: any) => {
          console.error('Error fetching status code:', error);
        }
      );
      const emailBodyHTML = this.postDetails.emailMessage; // Replace with your actual email body HTML
      this.postDetails.emailMessage = this.extractTextFromHTML(emailBodyHTML);
      this.getPostAttachmentsName(postId); 
      if (this.selectedPost) {
      } else {
        this.body = '';
      }
    },
    (error: HttpErrorResponse) => {
      console.error('Failed to fetch post details:', error.message);
    }
  );
}

  verifyEmailName (name: string): boolean{
    const index = name.indexOf(".eml");
    if (index !== -1){
      return true;
    }
    else { return false;}
  }
  
  getPostAttachmentsName(postId: string): void {
    this.postService.GetPostAttachmentsNamesByPostId(postId)
      .subscribe(
        documents => {
          console
          this.postDetails.attachments = documents; // Assign attachments to postDetails
        },
        error => {
          console.error('Error fetching documents:', error);
        }
      );
  }



  checkDossierNumber(): void {
    if (!this.dossierNumber) {
      this.showErrorViaToast('Please enter a dossier number');
      return;
    }
    this.postService.checkDossierNumberExists(this.dossierNumber)
      .subscribe(
        response => {
          if (response === "00000000-0000-0000-0000-000000000000") {
            console.log('Dossier number does not exist');
            this.showErrorViaToast('Dossier number does not exist');
          } else {
            this.showConfirm();
          }
        },
        error => {
          console.error('Error checking dossier number:', error);
          this.showErrorViaToast('Error checking dossier number');
        }
      );
  }
    showConfirm() {
        if (!this.visible) {
          this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' , life: 10000 });
          this.visible = true;
        }
    }

    onConfirm() {
      if (this.selectedPost && this.dossierNumber) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post successfully linked' });
        this.postService.linkPostToDossier(this.selectedPost.id, this.dossierNumber)
          .subscribe(
            (response) => {
              console.log('Post linked to dossier successfully:', response);
              this.messageService.clear('confirm');
              this.visible = false;
            },
            (error) => {
              console.error('Failed to link post to dossier:', error);
            }
          );
      } else {
        console.error('Selected post or dossier number is missing.');
      }
    }

    showErrorViaToast(message: string): void {
      this.messageService.add({severity: 'error', summary: 'Error Message', detail: message });
    }
    
    onReject() {
        this.messageService.clear('confirm');
        this.visible = false;
    }
 

  
  getAllPostInfo(): void {
    this.postService.getPostsWithoutDossierId()
      .subscribe((data: PostInfoDto[]) => {
        this.postInfoList = data;
        this.filteredPostInfoList = data;
      });
  }


  downloadDocument(fileName: string, postId : string ): void {
    let Name: string  = postId + "__" + fileName.substring(37);
    console.log(Name);
    this.postService.downloadDoc(Name).subscribe(
      response => {
        this.downloadFile(response, Name);
      },
      error => {
        console.error('Error downloading document:', error);
      }
    );
  }

  private downloadFile(data: any, fileName: string): void {
    const blob = this.base64toBlob(data, 'application/octet-stream');
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private base64toBlob(base64Data: string, contentType: string): Blob {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }




 
  
  reset() {
    this.sc.scrollToIndex(0, 'smooth');
  }
  
  onResize(event: any) {
    const panelHeight = event.panel.size.height - 50; // Subtracting any additional margin/padding
    this.renderer.setStyle(this.scroller.nativeElement, 'height', panelHeight + 'px');
    this.scrollerHeight = `${panelHeight}px`; // Update scrollerHeight property
  }





}

