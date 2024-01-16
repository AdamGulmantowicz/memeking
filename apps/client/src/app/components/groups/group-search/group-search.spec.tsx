import { render } from '@testing-library/react';

import GroupSearch from './group-search';

describe('GroupSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupSearch />);
    expect(baseElement).toBeTruthy();
  });
});
