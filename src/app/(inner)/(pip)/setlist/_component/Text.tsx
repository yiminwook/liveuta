interface TextProps {
  text: string;
}
export default function Text({ text }: TextProps) {
  return <p>{text}</p>;
}
