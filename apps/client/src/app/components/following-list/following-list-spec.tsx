import { render } from '@testing-library/react';

import FollowingList from './following-list';

describe('FollowingList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FollowingList />);
    expect(baseElement).toBeTruthy();
  });
});
