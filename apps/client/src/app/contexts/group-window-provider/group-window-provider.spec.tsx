import { render } from '@testing-library/react';

import GroupWindowProvider from './group-window-provider';

describe('GroupWindowProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupWindowProvider />);
    expect(baseElement).toBeTruthy();
  });
});
