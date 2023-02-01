import { Avatar } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;

  :hover {
    background-color: #e9eaeb;
  }
`;

export const UserAvatar = styled(Avatar)`
  margin-right: 15px;
  margin: 5px;
`;
