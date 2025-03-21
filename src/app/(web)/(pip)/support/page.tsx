'use client';
import variable from '@variable';
import { CommentCount, DiscussionEmbed } from 'disqus-react';

const SHORT_NAME = 'liveuta';
const DOMAIN = 'https://liveuta.vercel.app';
const IDENTIFIER = 'support_v1';
const TITLE = '라이브우타 지원';

export default function SupportPage() {
  return (
    <div
      style={{
        maxWidth: variable.breakpointMd,
        margin: '0 auto',
        colorScheme: 'initial',
        paddingInline: '1rem',
      }}
    >
      <h2>Support</h2>
      <CommentCount
        shortname={SHORT_NAME}
        config={{
          url: DOMAIN,
          identifier: IDENTIFIER,
          title: TITLE,
        }}
      >
        Comments
      </CommentCount>
      <DiscussionEmbed
        shortname={SHORT_NAME}
        config={{
          url: DOMAIN,
          identifier: IDENTIFIER,
          title: TITLE,
        }}
      />
    </div>
  );
}
