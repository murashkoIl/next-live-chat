import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 10;
  top: 0;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid whitesmoke;
`;

export const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 15px;
    color: grey;
  }
`;

export const HeaderIcons = styled.div``;

export const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

export const EndOfMessage = styled.div`
  margin-bottom: 60px;
`;

export const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 10;
`;

export const Input = styled.input`
  flex: 1;
  outlined: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
