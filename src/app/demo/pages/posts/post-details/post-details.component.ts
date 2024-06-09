import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DossierDto } from 'src/app/demo/data/dossier';
import { PostDto } from 'src/app/demo/data/post';
import { PostService } from 'src/app/demo/services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      gap: 20px; /*Add some space between the two cards */
    }

    .card {
      flex: 1; /* Optional: Makes the cards take equal width */
    }
  `]
}
)
export class PostDetailsComponent {

  id! : string;
  selectedPost!: PostDto;
  dossierDetails!: DossierDto | null;

  constructor(private route: ActivatedRoute , private postService: PostService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam !== null ? idParam : ""; // Provide a default value or handle the error
    });
    this.getPostDetails(this.id);
}

  getPostDetails(postId: string): void {
    this.postService.getPostDetails(postId).subscribe(
      (data: PostDto) => {
        this.selectedPost = data;

        this.postService.getStatusCodeByPostId(postId).subscribe(
          (statusCode: any) => {
            this.selectedPost.Status = statusCode;
          },
          (error: any) => {
            console.error('Error fetching status code:', error);
          }
        );
        if (this.selectedPost.dossierId) {
          this.getDossierDetails(this.selectedPost.dossierId);
        } else {
          this.dossierDetails = null; // Or handle it as needed
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to fetch post details:', error.message);
      }
    );
  }


  getDossierDetails(dossierId: string): void {
    this.postService.getDossierById(dossierId).subscribe(
      (dossier: DossierDto) => {
        this.dossierDetails = dossier;
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to fetch dossier details:', error.message);
        this.dossierDetails = null; // Or handle it as needed
      }
    );
  }
}
