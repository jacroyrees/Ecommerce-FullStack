import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { Router}  from './components/Router/Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
     <AuthProvider>
        <Router />
        </AuthProvider>
    </MantineProvider>
  );
}