import React from 'react';
import { AuthUserProvider } from './AuthUserProvider';
import { GroupProvider } from './GroupProvider';
import Routes from './Routes';

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <AuthUserProvider>
      <GroupProvider>
        <Routes />
      </GroupProvider>
    </AuthUserProvider>
  );
}