import { Button } from '@mantine/core';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useTranslations } from '@/libraries/i18n/client';
import GridCore from './grid-core';
import { saveLocalStorageLayout, saveLocalStorageVideoMap } from './helper';

export default function Grid() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GridCore />
    </ErrorBoundary>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { t } = useTranslations();

  const onClick = () => {
    saveLocalStorageLayout({});
    saveLocalStorageVideoMap({});
    resetErrorBoundary();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>{t('error.internalServerError.message1')}</p>
      <p>{t('error.internalServerError.message2')}</p>
      <div style={{ textAlign: 'center' }}>
        <Button size="xs" onClick={onClick}>
          {t('error.internalServerError.retry')}
        </Button>
      </div>
    </div>
  );
}
