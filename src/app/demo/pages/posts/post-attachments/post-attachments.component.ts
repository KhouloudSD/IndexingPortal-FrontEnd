import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

import { SPDocument } from 'src/app/demo/data/SPDocument';
import { PostService } from 'src/app/demo/services/posts.service';

@Component({
  selector: 'app-post-attachments',
  templateUrl: './post-attachments.component.html',
  styles: [`
    .small-button {
      padding: 0.25em 0.25em;
      font-size: 0.5rem;
    }

    
  `]
})
export class PostAttachmentsComponent implements OnInit {
  id!: string;
  documents: SPDocument[] = [];
  attachmentsNames: string[] = [];
  loading: boolean = true;
  selectedFile?: File;


  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam !== null ? idParam : ""; // Provide a default value or handle the error
      if (this.id) {
        this.getDocumentsById(this.id);
      }
    });
  }

  downloadDocument(fileName: string, postId : string ): void {
    let Name: string  = postId + "__" + fileName;
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
  
  downloadFile(data: any, fileName: string): void {
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

  getDocumentsById(postId: string): void {
    this.loading = true; 
    this.postService.getDocuments(postId).subscribe(
      documents => {
        this.documents = documents;
        console.log(this.documents);
        this.loading = false;
      },
      error => {
        console.error('Error fetching documents:', error);
        this.loading = false; 
      }
    );
  }

  viewDocument(document: SPDocument): void {
    console.log('Viewing document:', document);
  }

  editDocument(document: SPDocument): void {
    console.log('Editing document:', document);
  }

  deleteDocument(documentId: string): void {
    this.postService.deleteDocument(documentId).subscribe(
      response => {
        console.log('Deleting document:', documentId);
        console.log('Response:', response);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Document deleted' });
        this.documents = this.documents.filter(doc => doc.Id !== documentId); // Update the documents list
        this.getDocumentsById(this.id); // Refresh the documents list
      },
      error => {
        console.error('Error deleting document:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting document' });
      }
    );
  }
  uploadFile(file: SPDocument ): void {
    console.log("inupload file terrerreta")
    console.log(file.Size)
    console.log(file.SizeBytes)
    console.log("kamalna tarrara")
    this.postService.uploadDocument(file, this.id).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
        this.getDocumentsById(this.id); // Refresh the documents list
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error uploading file' });
      }
    );
  }

  confirmDelete(documentId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Document?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteDocument(documentId);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  fileExtension(fileName: string): string {
    if (!fileName) {
      return "";
    }
    const index = fileName.lastIndexOf(".");
    if (index === -1) {
      return "";
    }
    return fileName.substring(index + 1).toLowerCase();
  }
  isEml(document : any) : boolean{
    return document.isEmail ;
  }

  isPDF(filename: string): boolean {
    return this.fileExtension(filename) === "pdf";
  }

  isTXT(filename: string): boolean {
    return this.fileExtension(filename) === "txt";
  }

  onFileSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      const file = this.selectedFile;

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Content = (reader.result as string).split(',')[1];
          const spDocument = new SPDocument(
            '', // Assign a unique ID or leave it blank if generated by the backend
            file.name,
            this.id,
            this.fileExtension(file.name) == "eml" ? "Overig" : "Correspondentie",
            false,
            false,
            new Date().toISOString(),
            'File description', // Replace with actual description if available
            `https://cedclaimexperts.sharepoint.com/sites/ProspectDMS/ProspectIndexing/${file.name}`, // Update if URL is different
            this.fileExtension(file.name),
            file.size.toString(),
            file.size.toString(),
            base64Content
          );
          this.uploadFile(spDocument);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  

 
}




/*

  */