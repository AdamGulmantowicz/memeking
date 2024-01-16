import { render } from '@testing-library/react';

import ProfileMenu from './profile-menu';

describe('ProfileMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileMenu />);
    expect(baseElement).toBeTruthy();
  });
});
