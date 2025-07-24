import { render, screen } from '@testing-library/react';
import { Cabins } from './cabins';

import { renderWithQuery } from '../../../../src/app/test-utils';

describe('Cabins', () => {
  it('should render successfully', () => {
    renderWithQuery(<Cabins />);
    expect(screen.getByText('All cabins')).toBeTruthy();
  });

  it('should render the Add cabin button', () => {
    renderWithQuery(<Cabins />);
    expect(screen.getByRole('button', { name: /Add new cabin/i })).toBeTruthy();
  });
});
