import { useEffect, useState } from 'react';
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import nikeSneakers from '../../assets/nikesneakers.png';
import { useAuth } from '../AuthContext/AuthContext';
import classes from './Welcome.module.css';

export function LoggedOut() {
  const { login } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      userName: '',
      password: '',
      email: '',
      phoneNumber: '',
      postCode: '',
      terms: false,
    },

    validate: {
      userName: (value) =>
        value.length < 3 || value.length > 16 ? 'Username should be 3-16 characters long' : null,
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
          ? null
          : 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number',
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Invalid email',
      phoneNumber: (value) =>
        /^\d{10,15}$/.test(value) ? null : 'Phone number should be between 10 to 15 digits',
      postCode: (value) =>
        /^[A-Za-z0-9]{3,10}$/.test(value) ? null : 'Post code should be between 3 to 10 characters',
    },
  });

  useEffect(() => {
    const { userName, password, email, phoneNumber, postCode, terms } = form.values;
    if (type === 'register') {
      setIsDisabled(!userName || !password || !email || !phoneNumber || !postCode || !terms);
    } else {
      setIsDisabled(!email || !password);
    }
  }, [form.values, type]);

  const handleSubmit = async (values) => {
    const endpoint =
      type === 'register'
        ? 'http://localhost:8091/auth/register'
        : 'http://localhost:8091/auth/login';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const contentType = response.headers.get('Content-Type');
      let responseBody;
      if (contentType && contentType.includes('application/json')) {
        responseBody = await response.json();
      } else {
        responseBody = await response.text();
      }

      console.log('Response status:', response.status);
      console.log('Response body:', responseBody);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      if (
        responseBody.message === 'User registered successfully.' ||
        responseBody.message === 'User logged in successfully.' ||
        responseBody === 'User registered successfully.' ||
        responseBody === 'User logged in successfully.'
      ) {
        alert(responseBody.message || responseBody);
        login(responseBody.userId); // Set the login state to true and store user ID
      } else {
        alert(`Failed to ${type}: ${responseBody.message || responseBody}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to submit form: ${error.message}`);
    }
  };

  const handleToggle = () => {
    toggle();
    form.reset();
  };

  return (
    <>
      <div className={classes.container}>
        <Title className={classes.title} ta="center" mt={100}>
          Sporty
          <Text
            className="bg-black"
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Shoes
          </Text>
        </Title>
        <Image src={nikeSneakers} alt="nike sneakers" className={classes.image} />
      </div>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Discover the ultimate collection of high-performance footwear at unbeatable prices. Elevate
        your game with our exclusive range of sneakers designed for champions. Visit our store and
        step into the future of sports fashion.
      </Text>
      <div className={classes.formContainer}>
        <Paper
          radius="md"
          p="xl"
          withBorder
          style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              {type === 'register' && (
                <>
                  <TextInput
                    label="Username"
                    placeholder="Your username"
                    value={form.values.userName}
                    onChange={(event) => form.setFieldValue('userName', event.currentTarget.value)}
                    radius="md"
                  />
                  <TextInput
                    label="Phone Number"
                    placeholder="Your phone number"
                    value={form.values.phoneNumber}
                    onChange={(event) =>
                      form.setFieldValue('phoneNumber', event.currentTarget.value)
                    }
                    radius="md"
                  />
                  <TextInput
                    label="Post Code"
                    placeholder="Your post code"
                    value={form.values.postCode}
                    onChange={(event) => form.setFieldValue('postCode', event.currentTarget.value)}
                    radius="md"
                  />
                </>
              )}

              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
                radius="md"
              />

              {type === 'register' && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl">
              <Anchor component="button" type="button" c="dimmed" onClick={handleToggle} size="xs">
                {type === 'register'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl" disabled={isDisabled}>
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    </>
  );
}