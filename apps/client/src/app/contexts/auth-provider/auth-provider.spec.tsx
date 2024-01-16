import { render } from '@testing-library/react';

import Auth from './auth-provider-2tsx';

describe('Auth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Auth />);
    expect(baseElement).toBeTruthy();
  });
});
