import { render } from '@testing-library/react';

import GroupSearchList from './group-search-list';

describe('GroupSearchList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupSearchList />);
    expect(baseElement).toBeTruthy();
  });
});
