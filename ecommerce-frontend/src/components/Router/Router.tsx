import React from 'react';
import HomePage  from '../../pages/Home.page';
import { useAuth } from '../AuthContext/AuthContext';
import {LoggedOut} from '../LoggedOut/LoggedOut';

export function Router() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <HomePage /> : <LoggedOut />;
}
