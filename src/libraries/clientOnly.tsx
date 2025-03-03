import { useEffect, useState } from 'react';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function ClientOnly({ fallback, children }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(() => true);
  }, []);

  if (hasMounted === false) return <>{fallback}</>;
  return <>{children}</>;
}
