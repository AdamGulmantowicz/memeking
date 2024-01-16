import { render } from '@testing-library/react';

import UserGroupList from './user-group-list';

describe('GroupJoinedList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserGroupList />);
    expect(baseElement).toBeTruthy();
  });
});
