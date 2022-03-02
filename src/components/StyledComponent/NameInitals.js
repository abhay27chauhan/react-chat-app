import styled from "styled-components";

const NameInitials = styled.div`
  font-family: Roboto;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 700;
  color: #566474;
  background-color: #f7f8fa;
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props) => props.position && props.position};
  top: ${(props) => props.top && props.top};
  left: ${(props) => props.left && props.left};
`;

export default NameInitials;
