import React from "react";

import "./Avatar.scss";
import { styles } from "./styles";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
const ChatEngineUI = (props) => {
  const projectId = process.env.REACT_APP_CE_PROJECT_ID;
  const username = props.user?.email;
  const secret = props.user?.email;
  // const secret = ["bob@mail.com"];

  const chatProps = useMultiChatLogic(
    projectId,
    username,
    secret
  );

  return (
    <div
      className='transition-5'
      style={{
        ...styles.chatEngineWindow,
        ...{
          height: props.visible ? "100%" : "0%",
          zIndex: props.visible ? "100" : "0",
          width: "100%",
          backgroundColor: "white",
        },
      }}
    >
      {props.visible && (
        <>
          <MultiChatSocket
            // projectId={process.env.REACT_APP_CE_PROJECT_ID}
            // username={props.user.email}
            // secret={props.user.email}
            {...chatProps}
          />
          <MultiChatWindow
            {...chatProps}
            style={{ height: "600px" }}
          />
        </>
      )}
    </div>
  );
};
export default ChatEngineUI;
