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
          "AI 게임 캐릭터 그림 GAMECARD.GG - AI, 그림, 게임, 캐릭터, 나만의 게임 캐릭터"}
      </title>
      <meta
        name="description"
        content={
          description ||
          "생각하는 그대로, 그림 그리듯이. 당신이 원하는 캐릭터 그림을 GAMECARD.GG에서 만나보세요! - AI, 그림, 게임, 캐릭터, 나만의 게임 캐릭터"
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:title"
        content={
          title ||
          "AI 게임 캐릭터 그림 GAMECARD.GG - AI, 그림, 게임, 캐릭터, 나만의 게임 캐릭터"
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://gamecard.gg"} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="정리습관" />
    </Head>
  );
};

export default HeadMeta;
