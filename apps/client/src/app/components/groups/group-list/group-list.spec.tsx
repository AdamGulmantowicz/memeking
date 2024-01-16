import { render } from '@testing-library/react';

import GroupList from './group-list';

describe('GroupList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupList />);
    expect(baseElement).toBeTruthy();
  });
});
