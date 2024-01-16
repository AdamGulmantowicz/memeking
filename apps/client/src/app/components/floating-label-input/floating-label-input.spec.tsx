import { render } from '@testing-library/react';

import FloatingLabelInput from './floating-label-input';

describe('FloatingLabelInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FloatingLabelInput />);
    expect(baseElement).toBeTruthy();
  });
});
