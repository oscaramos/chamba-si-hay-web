import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;

  height: 320px;
  overflow-y: scroll;
  width: 100%;

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

export default function Scrollable(props) {
  const containerRef = useRef(null);

  const [showShadow, setShowShadow] = useState(true);

  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    setCanScroll(isScrollable(containerRef.current));
  }, [props]);

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
    <ScrollableContainer
      onScroll={handleScroll}
      showShadow={canScroll && showShadow}
      ref={containerRef}
      {...props}
    />
  );
}
