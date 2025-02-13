import { useState, useEffect } from 'react';
import { Stack, Group, TextInput, Button, Card, Title, Table, ActionIcon, Select, Checkbox } from "@mantine/core";
import { IconSearch, IconEdit, IconTrash } from "@tabler/icons-react";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [postCode, setPostCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [includePostcode, setIncludePostcode] = useState(false);
  const [includeDateOfBirth, setIncludeDateOfBirth] = useState(false);

  useEffect(() => {
    // Fetch users from /users
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8091/users');
        if (!response.ok) {
          throw new Error(`Users response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.currentTarget.value);
  };

  const handlePostcodeChange = (event) => {
    setPostCode(event.currentTarget.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.currentTarget.value);
  };

  const handleIncludePostcodeChange = (event) => {
    setIncludePostcode(event.currentTarget.checked);
  };

  const handleIncludeDateOfBirthChange = (event) => {
    setIncludeDateOfBirth(event.currentTarget.checked);
  };

  const handleUpdateFilters = () => {
    let filtered = users;

    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (includePostcode && postCode) {
      filtered = filtered.filter(user =>
        user.postCode?.toLowerCase().includes(postCode.toLowerCase())
      );
    }

    if (includeDateOfBirth && dateOfBirth) {
      filtered = filtered.filter(user =>
        user.dateOfBirth?.includes(dateOfBirth)
      );
    }

    setFilteredUsers(filtered);
  };

  const handleClearFilters = () => {
    setSelectedRole('');
    setSearchTerm('');
    setPostCode('');
    setDateOfBirth('');
    setIncludePostcode(false);
    setIncludeDateOfBirth(false);
    setFilteredUsers(users);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8091/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Users response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Stack spacing="md">
      <Group position="apart">
        <TextInput
          placeholder="Search by name..."
          icon={<IconSearch size={16} />}
          style={{ width: '300px' }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button>Add New User</Button>
      </Group>

      <Group grow align="flex-start">
        {/* Filters Card */}
        <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: '30%' }}>
          <Title order={3} mb="md">Filters</Title>
          <Stack>
            <Select
              placeholder="Filter by role"
              data={[
                { value: 'ADMIN', label: 'Admin' },
                { value: 'USER', label: 'User' }
              ]}
              value={selectedRole}
              onChange={handleRoleChange}
            />
            <Group>
              <TextInput
                placeholder="Filter by postcode"
                value={postCode}
                onChange={handlePostcodeChange}
                disabled={!includePostcode}
              />
              <Checkbox
                label="Include Postcode"
                checked={includePostcode}
                onChange={handleIncludePostcodeChange}
              />
            </Group>
            <Group>
              <TextInput
                placeholder="Filter by date of birth"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                disabled={!includeDateOfBirth}
              />
              <Checkbox
                label="Include Date of Birth"
                checked={includeDateOfBirth}
                onChange={handleIncludeDateOfBirthChange}
              />
            </Group>
            <Group>
              <Button variant="light" onClick={handleUpdateFilters}>Update Filters</Button>
              <Button variant="light" onClick={handleClearFilters}>Clear Filters</Button>
            </Group>
          </Stack>
        </Card>

        {/* Users Card */}
        <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: '70%' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Username</th>
                <th style={{ textAlign: 'left' }}>Email</th>
                <th style={{ textAlign: 'left' }}>Role</th>
                <th style={{ textAlign: 'left' }}>Postcode</th>
                <th style={{ textAlign: 'left' }}>Date of Birth</th>
                <th style={{ textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={{ textAlign: 'left' }}>{user.userName}</td>
                  <td style={{ textAlign: 'left' }}>{user.email}</td>
                  <td style={{ textAlign: 'left' }}>{user.role}</td>
                  <td style={{ textAlign: 'left' }}>{user.postCode}</td>
                  <td style={{ textAlign: 'left' }}>
                    <Group spacing={8}>
                      <ActionIcon color="blue" variant="subtle">
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon color="red" variant="subtle" onClick={() => handleDeleteUser(user.id)}>
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Group>
    </Stack>
  );
};

export default UsersTab;