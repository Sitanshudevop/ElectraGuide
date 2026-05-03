'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { remoteConfig } from '@/firebase';
import { getBoolean, fetchAndActivate } from 'firebase/remote-config';

interface RemoteConfigContextType {
  enableTranslate: boolean;
  showCommunityPoll: boolean;
}

const RemoteConfigContext = createContext<RemoteConfigContextType>({
  enableTranslate: true,
  showCommunityPoll: true,
});

export function RemoteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<RemoteConfigContextType>({
    enableTranslate: true,
    showCommunityPoll: true,
  });

  useEffect(() => {
    const fetchConfig = async () => {
      if (remoteConfig) {
        try {
          await fetchAndActivate(remoteConfig);
          setConfig({
            enableTranslate: getBoolean(remoteConfig, 'enable_translate'),
            showCommunityPoll: getBoolean(remoteConfig, 'show_community_poll'),
          });
        } catch (error) {
          console.error('Failed to fetch remote config', error);
        }
      }
    };
    fetchConfig();
  }, []);

  return (
    <RemoteConfigContext.Provider value={config}>
      {children}
    </RemoteConfigContext.Provider>
  );
}

export const useRemoteConfig = () => useContext(RemoteConfigContext);
