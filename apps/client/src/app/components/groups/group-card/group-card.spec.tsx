import { render } from '@testing-library/react';

import GroupCard from './group-card';

describe('GroupCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupCard />);
    expect(baseElement).toBeTruthy();
  });
});
