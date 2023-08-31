import { styled } from 'styled-components';

export const TableWrapper = styled.table`
  background-color: ${(props) => props.theme.colors.blue600};
  position: relative;
  color: white;
  margin: 1rem;
  margin-top: -2rem;
  /* width: 65.3rem; */
  min-width: 770px;
  padding-top: 1.5rem;
  z-index: -1;

  & th {
    padding: 0.9rem;
    width: 110.5px;
  }

  & td {
    display:flex;
    border-top: 2px solid white;
    justify-content: center;
    align-items: center;
    padding: 0.9rem;
    width: 110.5px;
    font-size: 0.75rem;
  }
`;

export const TableHead = styled.tr`
  display: flex;
  justify-content: space-evenly;
  padding-top: 2rem;
  

  & :nth-child(even) {
    border-left: 2px solid white;
    border-right: 2px solid white;
  }
`;

export const TableRow = styled.tr`
  display: flex;
  justify-content: space-evenly;
  

  & :nth-child(even) {
    border-left: 2px solid white;
    border-right: 2px solid white;
  }
`;
