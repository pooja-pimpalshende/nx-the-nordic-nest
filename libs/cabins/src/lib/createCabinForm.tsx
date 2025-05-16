import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button, Cabin, FileInput, Form, Input, Textarea } from '@/shared';
import { createEditCabin } from './services';
import { Cabin as MyCabin } from './cabinTypes';
import { FormRow } from './FormRow';

type FormValues = Cabin;
type CabinToEditType = {
  cabinToEdit?: Cabin;
};
type NewCabinDataType = {
  newCabinData: Cabin;
  id: number | undefined;
};

export function CreateCabinForm({ cabinToEdit }: CabinToEditType) {
  const { id: editId, ...editValues } = cabinToEdit ?? {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormValues>({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message);
    },
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: NewCabinDataType) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin edited successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data: FormValues) {
    console.log(data);
    if (isEditSession)
      editCabin({ newCabinData: { ...data, image: data.image }, id: editId });
    else createCabin({ ...data, image: data.image });
  }

  function onError(errors: FieldErrors<FormValues>) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) => {
              const discount = value === null ? 0 : Number(value);
              const regularPrice = getValues().regularPrice ?? 0;
              return (
                discount <= regularPrice ||
                'Discount should be less than regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variations="secondary" type="reset">
          Cancel
        </Button>

        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}
