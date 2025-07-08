import { Heading } from '@/shared';
import { SignUpForm } from './signUpForm';

export function Users() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignUpForm />
    </>
  );
}
