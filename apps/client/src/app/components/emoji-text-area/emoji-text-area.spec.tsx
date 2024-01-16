import { render } from '@testing-library/react';

import EmojiTextArea from './emoji-text-area';

describe('EmojiTextArea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmojiTextArea />);
    expect(baseElement).toBeTruthy();
  });
});
