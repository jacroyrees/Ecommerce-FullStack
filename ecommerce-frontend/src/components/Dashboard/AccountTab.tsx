import { useState } from 'react';
import { Button, Card, PasswordInput, Stack, Title, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useAuth } from '../AuthContext/AuthContext';

const AccountTab = () => {
  const { userId } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'All fields are required',
        color: 'red'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'New passwords do not match',
        color: 'red'
      });
      return;
    }

    setLoading(true);
    try {
      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await fetch(`http://localhost:8091/users/${userId}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      notifications.show({
        title: 'Success',
        message: 'Password updated successfully',
        color: 'green'
      });

      // Clear the form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to change password',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={2} mb="md">
        Change Password
      </Title>
      <Stack spacing="md">
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.currentTarget.value)}
          required
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          required
        />
        <Button
          onClick={handlePasswordChange}
          loading={loading}
          disabled={loading}
        >
          Update Password
        </Button>
      </Stack>
    </Card>
  );
};

export default AccountTab;