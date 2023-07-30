import React, { useState } from "react";
import { styles } from "./styles";

import { LoadingOutlined } from "@ant-design/icons";

import Avatar from "./Avatar";

import axios from "axios";

const EmailForm = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    getOrCreateUser((user) => {
      props.setUser(user);
      getOrCreateChat((chat) => props.setChat(chat));
    });

    if (isValidEmailFormat(email)) {
      setLoading(true);
      getOrCreateUser((user) => {
        props.setUser(user);
        getOrCreateChat((chat) => props.setChat(chat));
      });
    } else {
      setIsValidEmail(false);
    }
  }
  function getOrCreateUser(callback) {
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: email,
          secret: email,
          email: email,
        },
        {
          headers: {
            "Private-Key":
              process.env.REACT_APP_CE_PRIVATE_KEY,
          },
        }
      )
      .then((r) => callback(r.data));
  }

  function getOrCreateChat(callback) {
    axios
      .put(
        "https://api.chatengine.io/chats/",
        {
          usernames: ["Minh", email],
          is_direct_chat: true,
        },
        {
          headers: {
            "Private-Key":
              process.env.REACT_APP_CE_PRIVATE_KEY,
          },
        }
      )
      .then((r) => callback(r.data));
  }

  function isValidEmailFormat(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? "100%" : "0%",
          opacity: props.visible ? "1" : "0",
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div style={styles.stripe}></div>
      </div>
      <div
        className='transition-5'
        style={{
          ...styles.loadingDiv,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "0.33" : "0",
          },
        }}
      ></div>
      <LoadingOutlined
        className='transition-5'
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "1" : "0",
            fontSize: "82px",
            top: "calc(50% - 41px)",
            left: "calc(50% - 41px)",
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          style={{
            position: "relative",
            top: "10%",
            left: "calc(50% - 41px)",
          }}
        />

        <div style={styles.topText}>
          Welcome to my <br /> support
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            position: "relative",
            width: "100%",
            top: "19.75%",
          }}
        >
          <input
            style={styles.emailInput}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsValidEmail(true); // Reset the email validation status when the user starts typing
            }}
            placeholder='Your Email'
          />
        </form>
        {isValidEmail ? null : (
          <div style={{ color: "red", fontSize: "12px" }}>
            Please enter a valid email address.
          </div>
        )}

        <div style={styles.bottomText}>
          Enter your Email
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
