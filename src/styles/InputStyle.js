import styled from "styled-components";

export const Input = styled.input`
  /* dimensions */
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "70px"};

  /* colors */
  color: ${(props) => props.textColor || "#434343"};

  /* spacing */
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};

  /* border */
  border: ${(props) => props.border || "0"};

  box-sizing: border-box;
`;
