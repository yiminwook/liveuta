import 'server-only';
import { google } from 'googleapis';
import { oauth2Client } from './google';

export const sendMail = async (arg: {
  to: string;
  title: string;
  body: string;
  refreshToken: string;
}) => {
  oauth2Client.setCredentials({
    refresh_token: arg.refreshToken,
  });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const emailLines = [
    `To: grs0412@naver.com`,
    `Subject: =?UTF-8?B?${Buffer.from(arg.title, 'utf-8').toString('base64')}?=`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    Buffer.from(arg.body, 'utf-8').toString('base64'),
  ];

  const email = emailLines.join('\r\n');

  // base64url 인코딩 (base64의 +, /, = 문자를 URL-safe 문자로 변환)
  const encodedEmail = Buffer.from(email)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedEmail,
    },
  });

  return res;
};
