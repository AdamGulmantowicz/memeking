import { render } from '@testing-library/react';

import GroupHeader from './group-header';

describe('GroupHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupHeader />);
    expect(baseElement).toBeTruthy();
  });
});
