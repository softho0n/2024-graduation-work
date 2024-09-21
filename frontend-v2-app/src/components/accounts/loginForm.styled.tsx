import React from "react";
import styled from "styled-components";

const Positioner = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 10px 10rem;
`;

const LogoWrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  background: white;
  height: auto;
  width: 50%;
  background-color: transparent;
`;

const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border-radius: 10px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: 1px solid white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const InputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest} />
  </Wrapper>
);

const Aligner = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

export const RightAlignedLink = ({ children, onClick }) => (
  <Aligner onClick={onClick}>{children}</Aligner>
);

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  width: 50%;
  color: black;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(141, 198, 63, 0.8);

  cursor: pointer;
  user-select: none;
`;

export const AuthButton = ({ children, onClick }) => (
  <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>
);

export const AuthWrapper = ({ desc, children }) => (
  <Positioner>
    <LogoWrapper>{desc}</LogoWrapper>
    <Contents>{children}</Contents>
  </Positioner>
);
