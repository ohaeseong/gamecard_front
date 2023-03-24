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
        <div className="w-full h-full flex flex-row bg-zinc-900">
          <div className="h-full w-1/2 flex items-center justify-center flex-col">
            <div className="ml-40 p-14 rounded bg-zinc-800 flex justify-center flex-col">
              <div className="flex flex-row w-[500px]">
                <h1 className="text-[50px] leading-[50px] -ml-2 text-black-700 text-white">
                  GAMECARD.GG
                </h1>
              </div>
              <pre className="mt-4 text-white">{`내가 키운 캐릭터,\n한 곳에 등록하고 공유하고 즐기세요.\nGAMECARD.GG에서!\n`}</pre>
              <div className="flex flex-row mt-8 space-x-2">
                <Link
                  href="https://apps.apple.com/us/app/gamecard-gg/id6446257166"
                  target="_blank"
                >
                  <button className="py-2 rounded-lg">
                    <Image
                      className="object-contain rounded"
                      src="/images/etc/apple.svg"
                      alt="example_image"
                      width={150}
                      height={300}
                    />
                  </button>
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=gg.gamecard.gamecard"
                  target="_blank"
                >
                  <button className="py-2 rounded">
                    <Image
                      className="object-contain rounded"
                      src="/images/etc/google_play_store.png"
                      alt="example_image"
                      width={150}
                      height={300}
                    />
                  </button>
                </Link>
              </div>
            <div className="w-[550px]">
              <button
                className="py-2 px-9 rounded bg-indigo-600 text-white focus:outline-black"
                onClick={goToCreateAiImage}
              >
                웹에서 보기
              </button>
              </div>

            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-[550px] h-[600px] bg-black rounded-xl relative">
              {/* <div className="w-[320px] h-[200px] absolute -left-[70px] top-[365px] shadow-2xl rounded-xl bg-white" /> */}
              {/* <div
                className="w-[400px] h-[400px] bg-black absolute -left-28 top-36 rounded-xl bg-cover bg-right"
                style={{
                  backgroundImage: "url(/images/etc/home_image.jpg)",
                }}
              /> */}

              <div className="flex flex-col bg-black shadow-2xl right-16 top-20 left-16 rounded-xl bg-cover bg-right justify-center items-center">
                <Image
                  className="object-contain rounded"
                  src="/images/etc/002.png"
                  alt="example_image"
                  width={200}
                  height={200}
                />
                <div className="flex items-center justify-center h-28 w-full flex-col">
                  {/* <h1 className="text-2xl font-bold text-indigo-700">
                    GameCard
                  </h1> */}
                  <pre className="text-xs text-center text-slate-500 mt-2">
                    {`BETA v1.0.1: AI 이미지 생성 업데이트`}
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
