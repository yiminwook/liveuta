'use client';
import { Session } from 'next-auth';

type Props = {
  session: Session;
};

export default function Client({}: Props) {
  return (
    <div>
      <h2>메타데이터</h2>
    </div>
  );
}
