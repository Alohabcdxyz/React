import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
const SupportAdmin = (props) => {
  const chatProps = useMultiChatLogic(
    process.env.REACT_APP_CE_PROJECT_ID,
    "Minh",
    "1highbar456"
  );
  return (
    <div>
      <>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow
          {...chatProps}
          style={{ height: "600px" }}
        />
      </>
    </div>
  );
};

export default SupportAdmin;
