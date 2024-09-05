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
  color: red;
  justify-content: center;
`;

const Contents = styled.div`
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

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const OlWrapper = styled.ol`
  width: 100%;
  display: flex;
  flex-direction: column; /* 수직 방향으로 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  padding: 0;
  margin: 0;
  list-style: none; /* 기본 리스트 스타일 제거 */
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
  outline: none;
  border-radius: 25px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: 1px solid white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  width: 30%;
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

export const LiWrapper = styled.li`
  height: 4.5rem;
  width: 80%;
  padding: 0.25rem;
  margin: 0.25rem;
  display: flex;
  border-bottom: 1px solid black;
`;

export const MusicElementLeftSide = styled.div`
  display: flex;
  width: 80%;
  background-color: white;
  height: 100%;
  align-items: center; /* 수직 중앙 정렬 */
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 0.5rem;
`;

export const MusicElementRightSide = styled.div`
  display: flex;
  width: 15%;
  align-items: center; /* 수직 중앙 정렬 */
  height: 100%;
  justify-content: space-between;
`;
export const MetaDataSide = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  flex: 6;
`;

export const ImgWrapper = styled.div`
  width: auto;
  height: 85%;
  overflow: hidden;
  border-radius: 0.3rem;
`;

export const IconImgWrapper = styled.div`
  width: auto;
  height: 40%;
  overflow: hidden;
  border-radius: 0.3rem;
`;

export const ThumbnailImg = styled.img`
  max-width: 100%; /* 이미지 너비를 부모 요소의 너비에 맞게 제한합니다. */
  max-height: 100%; /* 이미지 높이를 부모 요소의 높이에 맞게 제한합니다. */
  display: block; /* 기본적으로 이미지는 인라인 요소이므로 블록 요소로 변환합니다. */
  object-fit: contain; /* 이미지가 비율을 유지하며 부모 요소 내에서 완전히 표시되도록 합니다. */
`;

export const TitleText = styled.div`
  font-weight: bold;
`;

export const ArtistText = styled.div`
  font-size: 0.8rem;
  color: gray;
`;

export const Dummy = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 0.4rem;
`;

export const MusicElement = ({
  imgUrl,
  title,
  artist,
  label,
  like,
  isDownloaded,
  onClickHeart,
  onClickLyrics,
  onClickPlay,
  index,
  ...rest
}) => (
  <LiWrapper>
    <MusicElementLeftSide>
      <ImgWrapper>
        <ThumbnailImg src={imgUrl}></ThumbnailImg>
      </ImgWrapper>
      <MetaDataSide>
        <TitleText>{title}</TitleText>
        <ArtistText>{artist}</ArtistText>
      </MetaDataSide>
    </MusicElementLeftSide>
    <MusicElementRightSide>
      <IconImgWrapper>
        <ThumbnailImg
          src="/play.png"
          onClick={() => {
            onClickPlay(title);
          }}
        ></ThumbnailImg>
      </IconImgWrapper>
      <IconImgWrapper>
        <ThumbnailImg
          src={like ? "/heart.png" : "/blankheart.png"}
          alt="Like Icon"
          onClick={() => {
            onClickHeart(like, title, index);
          }}
        />
        {/* <audio ref={audioRef} src={audioSrc} /> */}
      </IconImgWrapper>
      <IconImgWrapper>
        <ThumbnailImg src="/download.png"></ThumbnailImg>
      </IconImgWrapper>
      {/* <IconImgWrapper>
        <ThumbnailImg
          src="/lyrics.png"
          onClick={() => {
            onClickLyrics();
          }}
        ></ThumbnailImg>
      </IconImgWrapper> */}
    </MusicElementRightSide>
  </LiWrapper>
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

export const AuthWrapper = ({ desc, children }) => (
  <Positioner>
    <Input placeholder="노래명 또는 아티스트 이름을 입력하세요."></Input>
    <Contents>{children}</Contents>
  </Positioner>
);

export const ListViewWrapper = ({ children }) => (
  <ListWrapper>
    <OlWrapper>{children}</OlWrapper>
  </ListWrapper>
);
