import { Button, Form, FormRowVertical, Input, SpinnerMini } from '@/shared';
import { useState } from 'react';
import { useLogin } from './hooks';

export const LoginForm = () => {
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('123456');
  const { login, isPending } = useLogin();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          value={email}
          autoComplete="username"
          disabled={isPending}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          value={password}
          autoComplete="current-password"
          disabled={isPending}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button sizes="large" disabled={isPending}>
          {!isPending ? 'Login' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
};
