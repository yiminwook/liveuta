export interface SearchCommentType {
  comments_key: string;
  message: string;
}

export interface SearchCommentItemType {
  id: string;
  title: string;
  type: 'stream';
  published_at: string;
  available_at: string;
  duration: number;
  status: 'past';
  songcount: number;
  channel: {
    id: string;
    name: string;
    photo: string;
    english_name?: string;
  };
  comments: SearchCommentType[];
}

export interface SearchCommentResponseType {
  total: number;
  items: SearchCommentItemType[];
}
