import { render } from '@testing-library/react';

import GroupListItem from './group-list-item';

describe('GroupListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupListItem />);
    expect(baseElement).toBeTruthy();
  });
});
