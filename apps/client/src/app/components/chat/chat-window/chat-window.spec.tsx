import { render } from '@testing-library/react';

import Chat from './chat-window';

describe('Chat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Chat />);
    expect(baseElement).toBeTruthy();
  });
});
