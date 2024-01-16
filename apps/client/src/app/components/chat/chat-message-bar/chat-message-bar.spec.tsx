import { render } from '@testing-library/react';

import ChatMessageBar from './chat-message-bar';

describe('ChatMessageBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatMessageBar />);
    expect(baseElement).toBeTruthy();
  });
});
