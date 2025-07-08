import { Button, Form, FormRow, Input } from '@/shared';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateUser } from './hooks';

type FormValues = {
  password: string;
  passwordConfirm: string;
};

export function UpdatePasswordForm() {
  const { register, formState, getValues, reset, handleSubmit } =
    useForm<FormValues>();
  const { errors } = formState;
  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit: SubmitHandler<FormValues> = ({
    password,
  }: {
    password: string;
  }) => {
    if (password) updateUser({ password }, { onSuccess: () => reset });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimun of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Password need to match',
          })}
        />
      </FormRow>

      <FormRow>
        <Button onClick={() => reset} type="reset" variations="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}
