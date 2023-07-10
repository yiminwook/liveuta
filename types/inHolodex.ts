export interface SearchCommentItemType {
  id: string;
  title: string;
  type: 'stream';
  published_at: string;
  available_at: string;
  duration: number;
  status: 'past';
  songcount: number;
  channel: any;
  comments: any[];
}

export interface SearchCommentResponseType {
  total: number;
  items: SearchCommentItemType[];
}
