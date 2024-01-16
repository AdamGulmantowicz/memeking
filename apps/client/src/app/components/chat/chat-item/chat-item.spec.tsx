import { render } from '@testing-library/react';

import ChatItem from './chat-item';

describe('ChatItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatItem />);
    expect(baseElement).toBeTruthy();
  });
});
