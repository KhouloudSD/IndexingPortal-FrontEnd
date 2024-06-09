// dossier.ts (in your data folder)
export interface DossierDto {
    id: string;
    currentStatusCode: string;
    number: string;
    createdDate: string;
    createdBy: string | null;
    lastModifiedDate: string;
    lastModifiedBy: string | null;
  }
  