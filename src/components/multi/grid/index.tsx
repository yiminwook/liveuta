import { Button } from '@mantine/core';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import GridCore from './GridCore';
import { saveLayout, saveVideoMap } from './helper';

export default function Grid() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GridCore />
    </ErrorBoundary>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const onClick = () => {
    saveLayout({});
    saveVideoMap({});
    resetErrorBoundary();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>에러가 발생하였습니다.</p>
      <p>반복적으로 발생할시 관리자에게 문의해주세요</p>
      <div style={{ textAlign: 'center' }}>
        <Button size="xs" onClick={onClick}>
          RETRY
        </Button>
      </div>
    </div>
  );
}
