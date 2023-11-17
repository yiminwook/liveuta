import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import axios, { AxiosError } from 'axios';

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replaceAll(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
};

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

function getAccessToken() {
  return new Promise<string>(function (resolve, reject) {
    const jwtClient = new google.auth.JWT({ email: config.clientEmail, key: config.privateKey, scopes: SCOPES });
    jwtClient.authorize(function (err, tokens) {
      const access_token = tokens?.access_token;
      if (err || access_token === undefined || access_token === null) {
        return reject(err);
      }
      return resolve(access_token);
    });
  });
}

interface requestBody {
  token: string;
  title: string;
  body: string;
  imageUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const requestBody: requestBody = await request.json();

    const token = await getAccessToken();

    const body = {
      message: {
        token: requestBody.token,
        notification: {
          title: requestBody.title,
          body: requestBody.body,
          image: requestBody.imageUrl,
        },
      },
    };

    const res = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: `https://fcm.googleapis.com/v1/projects/${config.projectId}/messages:send`,
      data: body,
    });

    const data: { name: string } = res.data;

    return NextResponse.json({ data: data.name }, { status: 201 });
  } catch (error) {
    let err = error as Error;

    if (err instanceof AxiosError) {
      const data = err.response?.data.error;

      if (data) {
        err = data;
      }
    }

    const message = err?.message || 'Unknown error';
    return NextResponse.json({ data: message }, { status: 500 });
  }
}
