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
    <div className="flex flex-col h-screen justify-center items-center">
      <Header profile={profile} />
      <div className="bg-violet-500 w-full h-full flex items-center justify-center overflow-auto">
        <div className="bg-zinc-900 rounded w-[950px] h-[800px] flex-wrap p-10 flex flex-col justify-center">
          <div className="flex flex-row  h-[500px]">
            <div className="basis-3/5 bg-white rounded-lg flex flex-col items-center">
              <div className="flex justify-center items-center h-full">
                <span className="flex flex-row">
                  <h1 className="text-[4rem] text-indigo-600 leading-[10px]">
                    G
                  </h1>
                  <h2 className="text-3xl text-indigo-500">amecard!</h2>
                </span>
              </div>
              {/* <div className="w-full h-[200px] px-4">
                <div className="border-t border-indigo-500 py-4">
                  <pre className="font-extrabold text-3xl text-indigo-600">{`자캐를 간직하는 종합 게임 프로필 서비스`}</pre>
                </div>
              </div> */}
            </div>
            <div className="basis-2/5 flex flex-col ml-[2px]">
              <div className="w-full h-full flex flex-row">
                <div className="basis-1/2 bg-amber-300 relative rounded-lg right-0">
                  <div className="absolute rotate-90 top-[90px] -left-5 right-10 w-[200px]">
                    <Image
                      src="/images/etc/home_game_cover_1.jpg"
                      width={300}
                      height={200}
                      alt="home_image_1"
                    />
                  </div>
                </div>
                <div className="basis-1/2 ml-[2px] flex flex-col pl-2 pt-2 space-y-10 text-white">
                  <span>- 내용이 들어갑니다.</span>
                  <span>- 내용이 들어갑니다.</span>
                  <span>- 내용이 들어갑니다.</span>
                </div>
              </div>
              <div className="w-full h-3/4 rounded-lg flex items-center justify-center bg-violet-500 mt-[2px]">
                <div className="w-60 h-20 border-[3px] flex items-center justify-center text-lg text-white cursor-pointer rounded-lg">
                  더 많은 기능 보러 가기!
                </div>
              </div>
            </div>
          </div>
          <div className="h-[200px]  flex flex-row mt-[2px]">
            <div className="basis-3/5 h-full bg-slate-400 mr-[2px] rounded-lg text-lg text-white flex items-center justify-center">
              인터랙션 애니메이션이 들어갈 영역
            </div>
            <div className="basis-2/5 h-full bg-orange-400 rounded-lg flex items-center justify-center">
              <h1 className="text-2xl font-bold text-white">test</h1>
            </div>
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

    return {
      profile: userProfile,
    };
  }

  return {
    userProfile: {},
    userId,
  };
};

{
  /* <div className="w-full h-full flex justify-center">
<div className="w-[1080px] h-full flex-col pb-10">
  <div className="w-full h-2/3 border mt-2 bg-indigo-500 rounded flex flex-col items-center justify-around">
    <h1 className="text-white lg:text-3xl text-xl font-extrabold">
      <div className="flex flex-col items-center">자캐를 간직하는</div>
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
</div> */
}
