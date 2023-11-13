export interface FairyTaleInfoType {
  pageNum: number;
  talePageId: number;
  urlBackground: string;
  urlSound: string;
  narration: string;
  drawing: boolean;
  characters: CharactersInfoType[];
}
export interface CharactersInfoType {
  characterName: string;
  endX: number;
  endY: number;
  movement: string;
  startX: number;
  startY: number;
  taleCharacterid: number;
  urlGif: string | null;
  urlOriginal: string;
  urlTrace: string;
}

export interface DrawFairytaleScreenType {
  charactersInfo: FairyTaleInfoType['characters'];
  fairytaleTitle: string;
}

export interface TaleListInquiryType {
  content: TaleListInquiryContentType[];
  pageable: TaleListInquiryPageableType;
  size: number;
  number: number;
  sort: TaleListInquirySortType;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface TaleListInquiryPageableType {
  sort: TaleListInquiryPageableSortType;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}
export interface TaleListInquiryPageableSortType {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface TaleListInquirySortType {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface TaleListInquiryContentType {
  id: number;
  title: string;
  urlCover: string;
}

export interface FairytaleReadScreenType {
  title: string;
  taleId: number;
}

export interface ColoringFairytaleScreenType {
  roomId: string;
  captureBorderImagePath: string;
  fairytaleTitle: string;
  charactersInfo: CharactersInfoType[];
  completeLine: {path: string; color: string; strokeWidth: number}[];
  characterId: number;
  characterName: string;
  characterBorderURI: string;
  characterExplanation: string;
  characterOriginImageUri: string;
}

export interface TaleDrawedImageType {
  characterName: string;
  contentUri: {
    gifUri: string;
    drawUri: string;
  };
}
