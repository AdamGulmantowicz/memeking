import { render } from '@testing-library/react';

import GroupForm from './group-form';

describe('GroupForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupForm />);
    expect(baseElement).toBeTruthy();
  });
});
