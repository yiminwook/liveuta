'use client';
import { AUTO_SYNC_REFRESH_INTERVAL_OPTIONS, useAutoSync } from '@/hooks/useStorage';
import { Radio, Switch } from '@mantine/core';
import css from './AutoSync.module.scss';
import settingCss from './Setting.module.scss';

export default function AutoSync() {
  const { isActive, setIsActive, refreshInterval, setRefreshInterval } = useAutoSync();

  return (
    <div className={settingCss.wrap}>
      <label className={settingCss.settingLabel} htmlFor="auto-sync">
        자동 동기화
      </label>
      <div className={css.content}>
        <Switch
          id="auto-sync"
          size="lg"
          checked={isActive}
          onChange={(e) => setIsActive(e.currentTarget.checked)}
          onLabel="사용"
          offLabel="사용 안 함"
        />
        <div className={css.autoSyncOn} data-show={isActive}>
          <div className={css.autoSyncSubSetting}>
            <label className={settingCss.settingLabel}>동기화 주기</label>
            <div className={css.autoSyncRefreshInterval}>
              {AUTO_SYNC_REFRESH_INTERVAL_OPTIONS.map((interval) => (
                <Radio
                  key={interval}
                  label={`${interval}분`}
                  value={interval}
                  checked={refreshInterval === interval}
                  onChange={(e) => setRefreshInterval(Number(e.currentTarget.value))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
