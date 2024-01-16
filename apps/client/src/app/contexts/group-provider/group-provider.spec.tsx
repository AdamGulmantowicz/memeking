import { render } from '@testing-library/react';

import GroupProvider from './group-provider';

describe('GroupProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupProvider />);
    expect(baseElement).toBeTruthy();
  });
});
