import { render } from '@testing-library/react';

import CommentBar from './comment-bar';

describe('CommentBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentBar />);
    expect(baseElement).toBeTruthy();
  });
});
