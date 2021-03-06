import styled from 'styled-components';

export const Loading = styled.ActivityIndicator.attrs({
  size: 'large',
})`
  flex: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
`;
