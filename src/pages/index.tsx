import { getProfileById } from "@/apis/profile";
import Header from "@/components/Header";
import { IProfile } from "@/types/Account";
import { getCookieFromContext } from "@/utils/cookie";
import { NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  profile?: IProfile;
};

export default function HomePage({ profile }: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen">
      <Header profile={profile} />
      <div className="w-full h-full flex justify-center">
        <div className="w-[1080px] h-full flex-col pb-10">
          {/* <div className="flex flex-row">
            <div className="basis-3/4 h-[400px] border flex justify-center items-center">
              <h1 className="text-3xl font-extrabold text-indigo-600">
                Game Card
              </h1>
            </div>
            <div className="basis-1/4 ml-2 h-[400px] border" />
          </div>
          <div className="mt-2 flex flex-row">
            <div className="w-[200px] flex-1 border" />
            <div className="border ml-2 flex-1 flex-col flex" />
          </div> */}
          <div className="w-full h-2/3 border mt-2 bg-indigo-500 rounded flex flex-col items-center justify-around">
            <h1 className="text-white lg:text-3xl text-xl font-extrabold">
            <div className="flex flex-col items-center">
              자캐를 간직하는
            </div>
              종합 게임 프로필 서비스
            </h1>
            <h3 className="text-white lg:text-xl2 text-xl font-bold">
              GAMECARD.GG
            </h3>
            <div className="flex flex-col">
              <span className="text-white text-xl font-extrabold">
                Beta v1.
              </span>
              <h1
                className="text-white text-2xl font-extrabold px-3 py-2 bg-indigo-600 mt-2 cursor-pointer"
                onClick={goToCreateAiImage}
              >
                내 캐릭터로 AI 이미지 생성하기
              </h1>
            </div>
          </div>
          <div className="w-full h-1/3 border mt-2 bg-indigo-500 rounded flex flex-col justify-center items-center">
            <h1 className="text-white text-xl font-extrabold">앱에서 더보기</h1>
            <Link
              href="https://play.google.com/store/apps/details?id=gg.gamecard.gamecard"
              target="_blank"
            >
              <Image
                className="mt-8"
                src="/images/etc/google_play_store.png"
                width={200}
                height={100}
                alt="google play store"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  function goToCreateAiImage() {
    if (profile) {
      router.push(`/profile/${profile.id}`);
    } else {
      router.push("/login");
    }
  }
}

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  const userId = getCookieFromContext(ctx, "userId", "");
  const token = getCookieFromContext(ctx, "authToken", "");

  if (userId && token) {
    const userProfile: IProfile = await getProfileById({
      id: userId,
    });

    // if (userProfile?.Err === "NotExistUser" && ctx.res) {
    //   ctx.res.statusCode = 404;
    //   ctx.res.end("Not found");
    //   return;
    // }

    return {
      profile: userProfile,
    };
  }

  return {
    userProfile: {},
    userId,
  };
};
