import 'server-only';
import { headers } from 'next/headers';
import FirebaseAdmin from '@/libraries/firebase/admin';

export default async function parseIdToken() {
  const headerList = await headers();
  const idToken = headerList.get('Authorization')?.split('Bearer ')[1];
  if (!idToken) return null;

  return FirebaseAdmin.getInstance().auth.verifyIdToken(idToken);
}
