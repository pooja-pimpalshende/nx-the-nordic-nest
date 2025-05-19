import { Form, FormRow, Input, Spinner } from '@/shared';
import { useSettings } from './hooks';

export function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimun nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength ?? ''}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength ?? ''}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking ?? ''}
        />
      </FormRow>
      <FormRow label="Breakfast Price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice ?? ''}
        />
      </FormRow>
    </Form>
  );
}
