import { getProfileById } from "@/apis/profile";
import Header from "@/components/Header";
import HeadMeta from "@/components/HeadMeta";
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
    <>
      <HeadMeta />
      <div className="flex flex-col h-screen justify-center items-center">
        <Header profile={profile} />
        <div className="w-full h-full flex flex-row bg-slate-50">
          <div className="h-full w-1/2 flex items-center justify-center flex-col">
            <div className="ml-40">
              <div className="flex flex-row w-[500px]">
                <h1 className="text-[70px] leading-[60px] -ml-2 text-indigo-700">
                  GAME-CARD
                </h1>
              </div>
              <pre className="mt-4 text-slate-500">{`당신이 그리고 싶은 캐릭터, 이제 AI가 한번에 완성해드립니다!\n디자인 전문가가 아니어도, 멋진 캐릭터 디자인을 만들어보세요!\n생각하는 그대로, 그림 그리듯이. 당신이 원하는 캐릭터 그림을 만나보세요!`}</pre>
              <div className="flex flex-row mt-8 space-x-4">
                <Link
                  href="https://play.google.com/store/apps/details?id=gg.gamecard.gamecard"
                  target="_blank"
                >
                  <button className="py-2 px-3 rounded-lg text-white bg-indigo-500 focus:outline-none">
                    앱 다운 받기!
                  </button>
                </Link>
                <button
                  className="py-2 px-3 border rounded-lg bg-indigo-500 text-white focus:outline-none"
                  onClick={goToCreateAiImage}
                >
                  AI 그림 만들러 가기!
                </button>
              </div>
            </div>
          </div>
          <div className="h-full w-1/2 flex items-center justify-center">
            <div className="w-[550px] h-[600px] bg-indigo-600 rounded-xl relative">
              <div className="w-[320px] h-[200px] absolute -left-[70px] top-[365px] shadow-2xl rounded-xl bg-white" />
              <div
                className="w-[400px] h-[400px] bg-black absolute -left-28 top-36 rounded-xl bg-cover bg-right"
                style={{
                  backgroundImage: "url(/images/etc/home_image.jpg)",
                }}
              />

              <div className="w-[280px] flex flex-col h-[500px] bg-white shadow-2xl absolute right-16 -top-20 rounded-xl bg-cover bg-right justify-center items-center">
                <Image
                  className="object-contain rounded"
                  src="/images/etc/example_image.png"
                  alt="example_image"
                  width={200}
                  height={400}
                />
                <div className="flex items-center justify-center h-28 w-full flex-col">
                  <h1 className="text-2xl font-bold text-indigo-700">
                    GameCard
                  </h1>
                  <pre className="text-xs text-center text-slate-500 mt-2">
                    {`한 번의 클릭으로\n당신만의 특별한 캐릭터를 만들어보세요!`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
