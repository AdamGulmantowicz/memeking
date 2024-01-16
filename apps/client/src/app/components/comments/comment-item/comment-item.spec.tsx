import { render } from '@testing-library/react';

import CommentItem from './comment-item';

describe('CommentItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentItem />);
    expect(baseElement).toBeTruthy();
  });
});
