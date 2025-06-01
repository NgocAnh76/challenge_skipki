export interface ICaption {
  id?: string;
  content: string;
  topic: string;
  createdAt?: string;
  updatedAt?: string;
  phoneNumber?: string;
}
export interface ICaptionCreate {
  socialMedia: string;
  subject: string;
  tone: string;
}

export interface ISaveCaption {
  content: string;
  topic: string;
}

export interface IGenerateCaption {
  caption: string;
  subject?: string;
}
