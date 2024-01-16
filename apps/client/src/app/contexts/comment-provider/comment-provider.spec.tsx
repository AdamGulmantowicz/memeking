import { render } from '@testing-library/react';

import CommentProvider from './comment-provider';

describe('CommentProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentProvider />);
    expect(baseElement).toBeTruthy();
  });
});
