import { render } from '@testing-library/react';

import NameEditForm from './name-edit-form';

describe('NameEditForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NameEditForm />);
    expect(baseElement).toBeTruthy();
  });
});
