import styled from "styled-components";

export const Messagelement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

export const Sender = styled(Messagelement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

export const Reciever = styled(Messagelement)`
  text-align: left;
  background-color: whitesmoke;
`;

export const Timestamp = styled.span`
  color: grey;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`;
