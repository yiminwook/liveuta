import { useState, useEffect, FC } from 'react';

const clientOnly = <T extends object>(Component: FC<T>) => {
  return function ClientComponent(props: T) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(() => true);
    }, []);

    if (hasMounted === false) return null;

    return <Component {...props} />;
  };
};

export default clientOnly;
