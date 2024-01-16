import { render } from '@testing-library/react';

import PasswordEditForm from './password-edit-form';

describe('PasswordEditForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordEditForm />);
    expect(baseElement).toBeTruthy();
  });
});
