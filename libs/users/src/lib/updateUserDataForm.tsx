import { Button, FileInput, Form, FormRow, Input } from '@/shared';
import { useUpdateUser, useUser } from './hooks';
import { ChangeEvent, useState } from 'react';
import { ChangeHandler, SubmitHandler } from 'react-hook-form';

type UpdateUserProps = {
  password?: string;
  fullName: string;
  avatar: File | null;
};

export function UpdateUserDataForm() {
  const { user } = useUser();
  const email = user?.email ?? '';
  const currentFullName = user?.user_metadata?.fullName ?? '';

  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          //   e.target.reset();
        },
      }
    );
  };

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setAvatar(file);
          }}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variations="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}
