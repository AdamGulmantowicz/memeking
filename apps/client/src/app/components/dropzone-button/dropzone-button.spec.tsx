import { render } from '@testing-library/react';

import DropzoneButton from './dropzone-button';

describe('DropzoneButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DropzoneButton />);
    expect(baseElement).toBeTruthy();
  });
});
