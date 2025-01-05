'use client';
import { siteConfig } from '@/constants/siteConfig';
import { useAutoSync } from '@/hooks/useStorage';
import { Radio, Switch } from '@mantine/core';
import { useTranslations } from 'next-intl';
import css from './AutoSync.module.scss';
import settingCss from './Setting.module.scss';

export default function AutoSync() {
  const { isActive, setIsActive, refreshInterval, setRefreshInterval } = useAutoSync();
  const t = useTranslations('settings.autoSync');

  return (
    <div className={settingCss.wrap}>
      <label className={settingCss.settingLabel} htmlFor="auto-sync">
        {t('title')}
      </label>
      <div className={css.content}>
        <Switch
          id="auto-sync"
          size="lg"
          checked={isActive}
          onChange={(e) => setIsActive(e.currentTarget.checked)}
          onLabel={t('onLabel')}
          offLabel={t('offLabel')}
        />
        <div className={css.autoSyncOn} data-show={isActive}>
          <div className={css.autoSyncSubSetting}>
            <label className={settingCss.settingLabel}>{t('refreshInterval')}</label>
            <div className={css.autoSyncRefreshInterval}>
              {siteConfig.refreshIntervalOptions.map((interval) => (
                <Radio
                  key={interval}
                  label={`${interval}${t('unit')}`}
                  value={interval}
                  checked={refreshInterval === interval}
                  onChange={(e) => setRefreshInterval(Number(e.currentTarget.value))}
                  classNames={{
                    label: css.autoSyncRefreshIntervalLabel,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
