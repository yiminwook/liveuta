// @ts-ignore
import { SearchCommentType } from '@/type/inHolodex';
import ReactHtmlParser from 'react-html-parser';

interface CommentProps {
  comment: SearchCommentType;
}
// white-space: pre-wrap
type replacer = (substring: string, ...args: any[]) => string;

const Comment = ({ comment }: CommentProps) => {
  const replacer: replacer = (match, p1, p2, p3, offset, string) => {
    console.log(p1, p2, p3);
    return '';
  };
  const template = comment.message.replace(/(\d*):(\d*):(\d*)/g, replacer);
  // return <p>{ReactHtmlParser(template)}</p>;
  return <span></span>;
};

export default Comment;
