import { getProfileById } from "@/apis/profile";
import Header from "@/components/Header";
import { IProfile } from "@/types/Account";
import { getCookieFromContext } from "@/utils/cookie";
import { NextPageContext } from "next";

type Props = {
  profile?: IProfile;
};

export default function HomePage({ profile }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <Header profile={profile} />
      <div className="w-full h-full flex justify-center">
        <div className="w-[1080px] h-full border p-4">
          <div className="flex flex-row">
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
          </div>
        </div>
      </div>
    </div>
  );
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
