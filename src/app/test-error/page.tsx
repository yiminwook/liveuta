'use client';
import Fire from '@/libraries/error/Fire';

export default function TestErrorPage() {
  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ marginBottom: '2rem' }}>Error Test Page</h1>

      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <Fire label="page" />
      </div>
    </div>
  );
}
