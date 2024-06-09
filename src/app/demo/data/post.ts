interface Status {
    label: string;
    value: string;
}
export interface Post {
    PostId?: string;
    PostNumber?: string;
    HasAttachments?: string;
    PostDate?: string;
    EmailSubject? : string;
    EmailFrom?: string;
    EmailTo?: string;
    EmailCC?: string;
    Dossier_Id?: number;
    Status?: string;
}





export interface PostInfoDto {
    id: string;
    emailSubject: string;
    postDate: Date;
    emailFrom: string;
  }
  

  export interface PostDto {
    id: string;
    postNumber: string;
    postDate: Date;
    postReference?: string;
    emailFrom?: string;
    emailTo?: string;
    emailCc?: string;
    emailSubject?: string;
    emailMessage: string;
    dossierId?: string;
    hasAttachments: boolean;
    comments?: string;
    attachments?: string[]; 
    Status? : string;
  }
  