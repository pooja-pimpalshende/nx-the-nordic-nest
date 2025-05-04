import { render } from '@testing-library/react';

import Bookings from './bookings';

describe('Bookings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bookings />);
    expect(baseElement).toBeTruthy();
  });
});
