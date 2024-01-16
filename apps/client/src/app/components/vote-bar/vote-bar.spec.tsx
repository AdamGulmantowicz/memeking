import { render } from '@testing-library/react';

import VoteBar from './vote-bar';

describe('VoteBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VoteBar />);
    expect(baseElement).toBeTruthy();
  });
});
