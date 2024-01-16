import { render } from '@testing-library/react';

import AboutEditForm from './about-edit-form';

describe('AboutEditForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AboutEditForm />);
    expect(baseElement).toBeTruthy();
  });
});
