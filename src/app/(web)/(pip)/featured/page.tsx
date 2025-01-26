import { auth } from '@/libraries/nextAuth';
import { TFeaturedDataAPIReturn } from '@/types/api/mongoDB';
import Client from './page.client';

export default async function Page() {
  const session = await auth();

  const featuredData = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/featured`, {
    next: { revalidate: 86400, tags: ['featured'] },
  });

  const json: { data: TFeaturedDataAPIReturn; message: string } = await featuredData.json();

  return <Client session={session} featuredData={json.data} />;
}
