import { render } from '@testing-library/react';

import GroupTabs from './group-tabs';

describe('GroupsTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupTabs />);
    expect(baseElement).toBeTruthy();
  });
});
