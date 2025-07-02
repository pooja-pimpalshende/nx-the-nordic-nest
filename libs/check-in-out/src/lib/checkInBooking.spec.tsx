import { render } from '@testing-library/react';

import CheckInBooking from './checkInBooking';

describe('CheckInOut', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckInBooking />);
    expect(baseElement).toBeTruthy();
  });
});
