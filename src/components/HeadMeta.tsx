import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

const HeadMeta = ({ title, description, url, image }: Props) => {
  return (
    <Head>
      <title>
        {title ||
          "종합 게임 프로필 GAMECARD.GG - 내가 키운 캐릭터, AI 그림, 게임, 게임 카드, 게이밍 카드, game card, gaming card"}
      </title>
      <meta
        name="description"
        content={
          description ||
          "내가 키운 캐릭터. 한 곳에 등록하고 자유롭게 공유하세요, GAMECARD.GG에서! - 게임 카드, 게이밍 카드, game card, gaming card"
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:title"
        content={
          title ||
          "종합 게임 프로필 GAMECARD.GG - 내가 키운 캐릭터, AI 그림, 게임, 게임 카드, 게이밍 카드, game card, gaming card"
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://gamecard.gg"} />
      <meta property="og:image" content={image || ""} />
      <meta property="og:article:author" content="자캐 소장" />
    </Head>
  );
};

export default HeadMeta;
