import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import styled from "styled-components";
import SideDrawer from "./SideDrawer";

const StreamAlong = () => {
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <div className="stream-along-main">
        {!isRoomCreated && (
          <FaHandshake
            onClick={() => {
              setIsRoomCreated(true);
              setIsOpen(true);
            }}
          />
        )}
        {isRoomCreated && !isOpen && (
          <BsEye onClick={() => setIsOpen(!isOpen)} />
        )}
        {isRoomCreated && isOpen && (
          <>
            <Overlay open={isOpen} onClick={() => setIsOpen(!isOpen)} />
            <DrawerContainer open={isOpen}>
              <CloseButton onClick={() => setIsOpen(!isOpen)}></CloseButton>
            </DrawerContainer>
          </>
        )}
      </div>
    </Container>
  );
};

export default StreamAlong;

const Container = styled.div``;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    background-color: #333;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.9);
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ open }) => (open ? "1" : "0")};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;
