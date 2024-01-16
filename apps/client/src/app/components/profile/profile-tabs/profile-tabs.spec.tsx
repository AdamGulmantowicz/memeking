import { render } from '@testing-library/react';

import ProfileTabs from './profile-tabs';

describe('ProfileTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileTabs />);
    expect(baseElement).toBeTruthy();
  });
});
