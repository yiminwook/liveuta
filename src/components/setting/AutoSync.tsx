'use client';
import { Radio, Switch } from '@mantine/core';
import settingCss from './Setting.module.scss';
import css from './AutoSync.module.scss';
import { useLocalStorage } from '@mantine/hooks';

export default function AutoSync() {
  const [useAutoSync, setUseAutoSync] = useLocalStorage<boolean>({
    key: 'auto-sync',
    defaultValue: true,
  });

  return (
    <div className={settingCss.wrap}>
      <label className={settingCss.settingLabel} htmlFor="auto-sync">
        자동 동기화
      </label>
      <div className={css.content}>
        <Switch
          id="auto-sync"
          size="lg"
          checked={useAutoSync}
          onChange={(e) => setUseAutoSync(e.currentTarget.checked)}
          onLabel="사용"
          offLabel="사용 안 함"
        />
        <div className={css.autoSyncOn} data-show={useAutoSync}>
          <AutoSyncInterval />
        </div>
      </div>
    </div>
  );
}

const AUTO_SYNC_REFRESH_INTERVAL_OPTIONS = [3, 5, 10, 15, 30, 60];

function AutoSyncInterval() {
  const [autoSyncRefreshInterval, setAutoSyncRefreshInterval] = useLocalStorage<number>({
    key: 'auto-sync-refresh-interval',
    defaultValue: 3,
  });

  function onAutoSyncRefreshIntervalChange(value: string) {
    setAutoSyncRefreshInterval(Number(value));
  }

  return (
    <div className={css.autoSyncSubSetting}>
      <label className={settingCss.settingLabel}>동기화 주기</label>
      <div className={css.autoSyncRefreshInterval}>
        {AUTO_SYNC_REFRESH_INTERVAL_OPTIONS.map((interval) => (
          <Radio
            key={interval}
            label={`${interval}분`}
            value={interval}
            checked={autoSyncRefreshInterval === interval}
            onChange={(event) => onAutoSyncRefreshIntervalChange(event.currentTarget.value)}
          ></Radio>
        ))}
      </div>
    </div>
  );
}
