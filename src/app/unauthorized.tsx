import Link from 'next/link';

// 401 - Unauthorized page
export default function Unauthorized() {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Link href="/">Return Home</Link>
    </main>
  );
}
