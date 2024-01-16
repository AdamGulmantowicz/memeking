import { render } from '@testing-library/react';

import AddToChatList from './chat-add-list';

describe('AddToChatList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddToChatList />);
    expect(baseElement).toBeTruthy();
  });
});
