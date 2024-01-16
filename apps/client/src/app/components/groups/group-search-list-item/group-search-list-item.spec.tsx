import { render } from '@testing-library/react';

import GroupSearchListItem from './group-search-list-item';

describe('GroupSearchListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupSearchListItem />);
    expect(baseElement).toBeTruthy();
  });
});
