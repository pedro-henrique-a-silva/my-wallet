import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.blue100};
  padding: 1rem;
  margin-bottom: 2rem;
`;
