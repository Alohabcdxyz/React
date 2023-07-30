import React, { useState } from "react";
import "./Avatar.scss";
import { styles } from "./styles";
import EmailForm from "./EmailForm";
import ChatEngineUI from "./ChatEngine";
const SupportWindow = (props) => {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  return (
    <div
      className='transition-5'
      style={{
        ...styles.supportWindow,
        ...{ opacity: props.visible ? "1" : "0" },
        zIndex: 1000,
      }}
    >
      <EmailForm
        setUser={(user) => setUser(user)}
        setChat={(chat) => setChat(chat)}
        visible={user === null || chat === null}
      />

      <ChatEngineUI
        visible={user !== null || chat !== null}
        chat={chat}
        user={user}
      />
    </div>
  );
};

export default SupportWindow;
