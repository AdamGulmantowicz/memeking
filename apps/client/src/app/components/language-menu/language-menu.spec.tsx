import { render } from '@testing-library/react';

import LanguageMenu from './language-menu';

describe('LanguageMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LanguageMenu />);
    expect(baseElement).toBeTruthy();
  });
});
