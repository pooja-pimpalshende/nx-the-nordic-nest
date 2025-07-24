import { render, screen } from '@testing-library/react';
import { Settings } from './settings';
import { renderWithQuery } from '../../../../src/app/test-utils';

describe('Settings', () => {
  it('should render successfully', () => {
    renderWithQuery(<Settings />);
    expect(screen.getByText('Update hotel settings')).not.toBe(undefined);
  });
});
