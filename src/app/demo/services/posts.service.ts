import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, PostDto, PostInfoDto } from '../data/post';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { SPDocument } from '../data/SPDocument';
import { MessageService } from 'primeng/api';

@Injectable()
export class PostService {


    private apiServeurUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }


    

      getPostDetails(postId: string): Observable<PostDto> {
        const url = `${this.apiServeurUrl}/Posts/${postId}`;
        return this.http.get<PostDto>(url);
      }


      linkPostToDossier(postId: string, dossierNumber: string): Observable<any> {
        const queryParams = { dossier_number: dossierNumber };
        return this.http.post<any>(`${this.apiServeurUrl}/Posts/LinkPostToDossier/${postId}`, null, { params: queryParams });
      }

      getStatusCodeByPostId(id: string): Observable<string | null> {
        const url = `${this.apiServeurUrl}/Posts/PostStatus/${id}`;
        return this.http.get(url, { responseType: 'text' }).pipe(
          catchError((error: HttpResponse<string>) => {
            if (error instanceof HttpResponse) {
              return throwError(`Error: ${error.status} - ${error.statusText}`);
            } else {
              return throwError('An unexpected error occurred.');
            }
          })
        );
      }

      GetPostAttachmentsNamesByPostId(postId: string): Observable<string[]> {
        const url = `${this.apiServeurUrl}/Posts/postAttach/${postId}`;
        return this.http.get<string[]>(url);
      }



      
      getPostsWithoutDossierId(): Observable<PostInfoDto[]> {
        const url = `${this.apiServeurUrl}/Posts/NewPosts`;
        return this.http.get<PostInfoDto[]>(url);
    }

        getDocuments(postId: string): Observable<SPDocument[]> {
            return this.http.get<SPDocument[]>(`${this.apiServeurUrl}/Document/${postId}`);
        }
   
      downloadDoc(fileName: string): Observable<any> {
        return this.http.get<any>(`${this.apiServeurUrl}/Document/Download?fileName=${fileName}`);
      }

      checkDossierNumberExists(number: string): Observable<string> {
        const url = `${this.apiServeurUrl}/Dossier/${number}`;
        return this.http.get<string>(url);
      }


      blobToBase64(b : Blob )  {
        return new Promise((resolve, _) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(b);
        });
      }
    
      
    
      
}

