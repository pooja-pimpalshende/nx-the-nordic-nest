import { render } from '@testing-library/react';

import Cabins from './cabins';

describe('Cabins', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cabins />);
    expect(baseElement).toBeTruthy();
  });
});
