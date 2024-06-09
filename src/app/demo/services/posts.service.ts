import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Post, PostDto, PostInfoDto } from '../data/post';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import {  PagedList, SPDocument } from '../data/SPDocument';
import { MessageService } from 'primeng/api';
import { DossierDto } from '../data/dossier';

@Injectable()
export class PostService {


    private apiServeurUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

/*
    getAllPosts(pageNumber: number, pageSize: number): Observable<any> {
      const params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());
  
      return this.http.get<any>(`${this.apiServeurUrl}/Posts/postttttt`, { params })
        .pipe(
          catchError(this.handleError)
        );
    }*/
    

    deleteDocument(documentId: string): Observable<any> {
      const url = `${this.apiServeurUrl}/Posts/postAttachmentDeleteById/${documentId}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      return this.http.delete<any>(url, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }




    handleFileAndAttachment(fileId: string): Observable<any> {
      return this.http.post<any>(`${this.apiServeurUrl}/Posts/HandleFileAndAttachment`, fileId);
    }
    

    getAllPosts1(pageNumber: number, pageSize: number): Observable<PagedList<PostDto>> {
      const params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());
  
      return this.http.get<PagedList<PostDto>>(`${this.apiServeurUrl}/Posts/postttttt`, { params });
    }

    getDossierById(id: string): Observable<DossierDto> {
      const url = `${this.apiServeurUrl}/Dossier/GetByID/${id}`;
      return this.http.get<DossierDto>(url);
    }


    GetPostAttachmentsNamesByPostId(postId: string): Observable<string[]> {
      const url = `${this.apiServeurUrl}/Posts/postAttach/${postId}`;
      return this.http.get<string[]>(url);
    }

  
    private handleError(error: any): Observable<any> {
      console.error('An error occurred:', error); // 
      return throwError(error); // Let the caller handle the error
    }
    

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
        const url = `${this.apiServeurUrl}/Dossier/GetByNumber/${number}`;
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

