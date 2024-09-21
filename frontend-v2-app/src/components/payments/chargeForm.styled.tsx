import React from "react";
import styled from "styled-components";

const Positioner = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0px 5rem;
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
  width: 100%;
  padding: 0rem 4rem;
`;

export const horizontalWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 3rem;
`;

export const verticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex: 1;
  width: 80%;
`;

const TextAreaWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  heigth: 100%;
  min-width: 0;
  white-space: nowrap;
  width: 13%;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  heigth: 100%;
  min-width: 0;
  white-space: nowrap;
  padding-right: 2.5rem;
`;

const Input = styled.input`
  flex: 1;
  readonly: readonly;
  outline: none;
  border-radius: 10px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: 1px solid white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const TextArea = styled.textarea`
  width: 100%;
  outline: none;
  border-radius: 10px;
  font-size: 1.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: 1px solid white;
  height: 20rem;
  margin-top: 0.8rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Select = styled.select`
  width: 100%;
  outline: none;
  border-radius: 10px;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: 1px solid white;
  height: 2.5rem;
  margin-bottom: 0.5rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const DummyWrapper = styled.div`
  display: flex;
`;

const AdditionalButton = styled.div`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b8b8ff;
  border-radius: 30px;
  font-size: 1.25rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const InputWithLabelWithButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const FigureBoxWrapper = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  // height: 20rem;
`;

const ImageBox = styled.div`
  flex: 1;
  display: flex;
  height: 20rem;
  justify-content: center;
  align-items: center;
  border: 3px dotted black;
  background: transparent;
`;

const RoundedImageBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 1px solid;
`;

export const ImageObject = ({ src }) => (
  <ImageBox>
    <Image src={src} />
  </ImageBox>
);

export const RoundedImageObject = ({
  src,
  onClick,
  inputFile,
  handleFileUpload,
}) => (
  <RoundedImageBox onClick={onClick}>
    <input
      style={{ display: "none" }}
      ref={inputFile}
      onChange={handleFileUpload}
      type="file"
    />
    <Image src={src}></Image>
  </RoundedImageBox>
);

export const FigureBox = ({ children }) => (
  <FigureBoxWrapper>
    {/* <ImageObject src="/logo.png" /> */}
    {/* <ImageObject src="/logo.png" /> */}
    {children}
  </FigureBoxWrapper>
);

export const InputWithLabelWithButton = ({
  label,
  btnLabel,
  onClick,
  inputFile,
  handleFileUpload,
  ...rest
}) => (
  <InputWithLabelWithButtonWrapper>
    <Label>{label}</Label>
    <DummyWrapper>
      <Placeholder style={{ minWidth: "0" }}>
        사진은 앞 / 뒤 / 양 옆 4장 등록 해주세요.
      </Placeholder>
      <input
        style={{ display: "none" }}
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <AdditionalButton
        style={{ height: "3rem", padding: "1.8rem" }}
        onClick={onClick}
      >
        {btnLabel}
      </AdditionalButton>
    </DummyWrapper>
  </InputWithLabelWithButtonWrapper>
);

export const InputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest} />
  </Wrapper>
);

export const TextAreaWithLabel = ({ label, ...rest }) => (
  <TextAreaWrapper>
    <Label>{label}</Label>
    <TextArea {...rest} />
  </TextAreaWrapper>
);

export const SelectWithLabel = ({ label, options, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Select {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
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
  width: 30%;
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
