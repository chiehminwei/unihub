import React from 'react';
import { AuthUserProvider } from './AuthUserProvider';
import { CurrentTimeProvider } from './CurrentTimeProvider';
import { GroupProvider } from './GroupProvider';
import { UserGroupsProvider } from './UserGroupsProvider';
import Routes from './Routes';

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <CurrentTimeProvider>
      <AuthUserProvider>
        <UserGroupsProvider>
          <GroupProvider>
            <Routes />
          </GroupProvider>
        </UserGroupsProvider>
      </AuthUserProvider>
    </CurrentTimeProvider>
  );
}