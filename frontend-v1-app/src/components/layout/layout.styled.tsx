import styled from "styled-components";

export const TestBox = styled.div`
  background-color: ${(props) => (props.color ? "blue" : "red")};
  width: 100px;
`;

// export const TestBox = styled.div`
//   font-size:
// `

export const TestButton = styled.div`
  font-size: 30px;
`;

export const TopNavUL = styled.ul`
  display: flex;
`;

export const TopNavLI = styled.li`
  margin-right: 21px;
  color: white;
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  cursor: pointer;
  width: 200px;
`;
export const TopNav = styled.div``;
