
export class SPDocument {
    Id: string;
    DocumentName: string;
    PostId: string;
    DocType: string;
    IsEmail: boolean;
    IsKeyDocument: boolean;
    CreatedDate: string;
    FileDescription: string;
    Url: string;
    Extension: string;
    Size: string;
    SizeBytes: string;
    Content: string;
  
    constructor(
      Id: string,
      DocumentName: string,
      PostId: string,
      DocType: string,
      IsEmail: boolean,
      IsKeyDocument: boolean,
      CreatedDate: string,
      FileDescription: string,
      Url: string,
      Extension: string,
      Size: string,
      SizeBytes: string,
      Content: string
    ) {
      this.Id = Id;
      this.DocumentName = DocumentName;
      this.PostId = PostId;
      this.DocType = DocType;
      this.IsEmail = IsEmail;
      this.IsKeyDocument = IsKeyDocument;
      this.CreatedDate = CreatedDate;
      this.FileDescription = FileDescription;
      this.Url = Url;
      this.Extension = Extension;
      this.Size = Size;
      this.SizeBytes = SizeBytes;
      this.Content = Content;
    }
  }
  
  
  export class PagedList<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  
    constructor(items: T[], page: number, pageSize: number, totalCount: number, hasNextPage: boolean, hasPreviousPage: boolean) {
      this.items = items;
      this.page = page;
      this.pageSize = pageSize;
      this.totalCount = totalCount;
      this.hasNextPage = hasNextPage;
      this.hasPreviousPage = hasPreviousPage;
    }
  }
  