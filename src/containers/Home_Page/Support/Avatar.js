import React, { useState } from "react";
import { styles } from "./styles";
import "./Avatar.scss";
const Avatar = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={props.style}>
      <div
        className='transition-3'
        style={{
          ...styles.avatarHello,
          ...{ opacity: hovered ? "1" : "0" },
        }}
      >
        Hello There
      </div>
      <div
        className='transition-3'
        onMouseLeave={() => setHovered(false)}
        onMouseEnter={() => setHovered(true)}
        onClick={() => {
          props.onClick && props.onClick();
        }}
        style={{
          ...styles.chatWithMeButton,
          ...{
            border: hovered
              ? "1px solid #f9f0ff"
              : "4px solid #7a39e0",
          },
        }}
      ></div>
    </div>
  );
};

export default Avatar;
