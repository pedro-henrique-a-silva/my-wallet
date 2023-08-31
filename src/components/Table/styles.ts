import { styled } from 'styled-components';

export const TableWrapper = styled.ul`
  background-color: ${(props) => props.theme.colors.blue600};
  position: relative;
  background-color: royalblue;
  color: white;
  margin: 1rem;
  margin-top: -2rem;
  padding-top: 1.5rem;
  z-index: -1;
`;

export const TableHead = styled.li`
  display: flex;
  justify-content: space-evenly;

  & span {
    padding: 0.9rem;
  }
  & :nth-child(even) {
    border-left: 2px solid white;
    border-right: 2px solid white;
  }
`;
