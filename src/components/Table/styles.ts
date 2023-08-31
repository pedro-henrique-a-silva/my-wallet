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
  z-index: 2;

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
  

  & td:nth-child(even) {
    border-left: 2px solid white;
    border-right: 2px solid white;
  }
`;
type ButtonProp = {
  isEdit: boolean
};

export const Button = styled.button<ButtonProp>`
  background-color: ${(props) => ((props.isEdit) ? 'green' : 'red')};
  border: none;
  border-radius: 6px;
  margin: 0.3rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  text-align: center;
`;
