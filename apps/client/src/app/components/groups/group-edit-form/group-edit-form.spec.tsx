import { render } from '@testing-library/react';

import GroupEditForm from './group-edit-form';

describe('GroupEditForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupEditForm />);
    expect(baseElement).toBeTruthy();
  });
});
