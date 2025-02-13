import React, { useState } from 'react';
import {
  AppShell,
  Tabs,
  TextInput,
  PasswordInput,
  Button,
  Card,
  Text,
  Table,
  Group,
  Select,
  Stack,
  Title,
  Paper,
  ActionIcon,
  Box,
} from '@mantine/core';
import { IconSearch, IconPackage, IconUsers, IconChartBar, IconLock, IconEdit, IconTrash } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import AccountTab from '@/components/Dashboard/AccountTab';
import ProductsTab from '@/components/Dashboard/ProductsTab';
import ReportsTab from '@/components/Dashboard/ReportsTab';
import UsersTab from '@/components/Dashboard/UsersTab';


const HomePage = () => {
  const [activeTab, setActiveTab] = useState('account');

  
  

  
  return (
    <AppShell padding="md">
      <Box p="md" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title order={1} mb="lg">Admin Dashboard</Title>
        
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="account" icon={<IconLock size={16} />}>Account</Tabs.Tab>
            <Tabs.Tab value="products" icon={<IconPackage size={16} />}>Products</Tabs.Tab>
            <Tabs.Tab value="users" icon={<IconUsers size={16} />}>Users</Tabs.Tab>
            <Tabs.Tab value="reports" icon={<IconChartBar size={16} />}>Reports</Tabs.Tab>
          </Tabs.List>

          <Paper mt="md">
            <Tabs.Panel value="account"><AccountTab /></Tabs.Panel>
            <Tabs.Panel value="products"><ProductsTab /></Tabs.Panel>
            <Tabs.Panel value="users"><UsersTab /></Tabs.Panel>
            <Tabs.Panel value="reports"><ReportsTab /></Tabs.Panel>
          </Paper>
        </Tabs>
      </Box>
    </AppShell>
  );
};

export default HomePage;