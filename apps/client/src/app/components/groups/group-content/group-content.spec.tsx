import { render } from '@testing-library/react';

import GroupContent from './group-content';

describe('GroupFeed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupContent />);
    expect(baseElement).toBeTruthy();
  });
});
