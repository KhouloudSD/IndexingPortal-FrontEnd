export class SPDocument {
    Id: string;
    DocumentName: string;
    PostId: string;
    DocType: string;
    IsEmail: boolean;
    IsKeyDocument: boolean;
    CreatedDate: Date;
    FileDescription: string;
    Url: string;
    Extension: string;
  
    constructor(
      Id: string,
      DocumentName: string,
      PostId: string,
      DocType: string,
      IsEmail: boolean,
      IsKeyDocument: boolean,
      CreatedDate: Date,
      FileDescription: string,
      Url: string,
      Extension: string
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
    }
  }
  