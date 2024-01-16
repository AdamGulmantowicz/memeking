import { render } from '@testing-library/react';

import ContentFormBar from './content-form-bar';

describe('ContentFormBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentFormBar />);
    expect(baseElement).toBeTruthy();
  });
});
