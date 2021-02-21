import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiComponentsReactProps {}

const StyledUiComponentsReact = styled.div`
  color: pink;
`;

export function UiComponentsReact(props: UiComponentsReactProps) {
  return (
    <StyledUiComponentsReact>
      <h1>Welcome to ui-components-react!</h1>
    </StyledUiComponentsReact>
  );
}

export default UiComponentsReact;
