import React from 'react';
import { AuthUserProvider } from './AuthUserProvider';
import { CurrentTimeProvider } from './CurrentTimeProvider';
import { GroupProvider } from './GroupProvider';
import Routes from './Routes';

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <CurrentTimeProvider>
      <AuthUserProvider>
        <GroupProvider>
          <Routes />
        </GroupProvider>
      </AuthUserProvider>
    </CurrentTimeProvider>
  );
}