import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import JobHeader from "../components/headers/JobHeader";
import useMessages from "../hooks/useMessages";

const MessageContainer = styled.div`
  width: 100%;
`;

const MessageInnerContainer = styled.div`
  width: 60%;
  padding: 12px 16px;
  background-color: ${(props) => (props.isFromOwner ? "#00988D" : "white")};
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  margin-left: ${(props) => (props.isFromOwner ? "auto" : undefined)};
`;

function Message({ children: text, isFromOwner = false }) {
  return (
    <MessageContainer>
      <MessageInnerContainer isFromOwner={isFromOwner}>
        <div
          style={{
            color: isFromOwner ? "white" : "#00988D",
            marginBottom: -8,
            fontSize: 14,
          }}
        >
          {text}
        </div>
        <div
          style={{
            color: isFromOwner ? "#E5E5E5" : undefined,
            alignSelf: "flex-end",
            fontSize: 12,
          }}
        >
          16:05 h
        </div>
      </MessageInnerContainer>
    </MessageContainer>
  );
}

const MessagesContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;

  height: 320px;
  overflow-y: scroll;

  box-shadow: ${(props) =>
    props.showShadow
      ? "inset 0px -131px 100px -140px rgba(0, 0, 0, 0.2)"
      : undefined};

  // Hide scrollbar
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  scrollbar-width: none; /* Firefox */
`;

function isScrollable(element) {
  return (
    element.scrollWidth > element.clientWidth ||
    element.scrollHeight > element.clientHeight
  );
}

function MessagesContent({ messages }) {
  const containerRef = useRef(null);

  const [showShadow, setShowShadow] = useState(true);

  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    setCanScroll(isScrollable(containerRef.current));
  }, [messages]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setShowShadow(false);
    } else {
      setShowShadow(true);
    }
  };

  return (
    <MessagesContentContainer
      onScroll={handleScroll}
      showShadow={canScroll && showShadow}
      ref={containerRef}
    >
      {messages.map((message, index) => (
        <Message
          key={`${index} ${message.content}`}
          isFromOwner={message.isFromOwner}
        >
          {message.content}
        </Message>
      ))}
    </MessagesContentContainer>
  );
}

const MessagesInputContainer = styled.div`
  margin-top: 32px;
  background-color: white;
  border-radius: 50px;
`;

function MessagesInput({ onSendMessage }) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <MessagesInputContainer>
      <InputGroup>
        {/* -- Send Input --*/}
        <Form.Control
          style={{
            display: "flex",
            flexGrow: 1,
            border: 0,
            borderRadius: 50,
          }}
          type="text"
          name="message"
          autoComplete="off"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        {/*-- Send Icon --*/}
        <InputGroup.Append>
          <InputGroup.Text
            style={{
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
            }}
            onClick={handleSendMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} color="black" size="lg" />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </MessagesInputContainer>
  );
}

const MessagesContainer = styled.div`
  background-color: #eeeeee;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function Messages() {
  const { messages, send } = useMessages();

  return (
    <MessagesContainer>
      <MessagesContent messages={messages} />
      <MessagesInput onSendMessage={(message) => send(message)} />
    </MessagesContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 640px;

  @media screen and (max-width: 600px) {
    height: 100%;
  }
`;

function Chat() {
  return (
    <Container>
      <JobHeader />
      <Messages />
    </Container>
  );
}

export default Chat;
