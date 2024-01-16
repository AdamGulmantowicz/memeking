import { render } from '@testing-library/react';

import ChatProvider from './chat-provider';

describe('ChatProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatProvider />);
    expect(baseElement).toBeTruthy();
  });
});
