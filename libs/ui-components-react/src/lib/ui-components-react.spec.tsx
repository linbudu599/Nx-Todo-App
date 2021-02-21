import React from 'react';
import { render } from '@testing-library/react';

import UiComponentsReact from './ui-components-react';

describe('UiComponentsReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiComponentsReact />);
    expect(baseElement).toBeTruthy();
  });
});
