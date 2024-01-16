import { render } from '@testing-library/react';

import EmailEditForm from './email-edit-form';

describe('ProfileEditForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmailEditForm />);
    expect(baseElement).toBeTruthy();
  });
});
