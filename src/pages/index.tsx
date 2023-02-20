import { getProfileById } from "@/apis/profile";
import ImageList from "@/components/ImageList";
import { IListItem } from "@/components/List";
import ProfileCard from "@/components/ProfileCard";
import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { IProfile } from "@/types/Account";
import { getCookieFromContext } from "@/utils/cookie";
import { getGameAbilityFromProfile } from "@/utils/game";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

type Props = {
  userProfile: IProfile;
};

export default function HomePage({ userProfile }: Props) {
  // const games = getGameAbilityFromProfile<IListItem>(userProfile.games);
  // const maple = games.filter((game) => game.gameName === "maplestory")[0];
  console.log(userProfile);

  return (
    // <DefaultLayout profile={userProfile}>
    //   <ContentsLayout>
    //     <ProfileCard games={games} />
    //     <div className="w-full mt-8 text-xl font-bold text-indigo-600">
    //       Gallery
    //     </div>
    //     <ImageList className="mt-4" images={maple.gallery} />
    //   </ContentsLayout>
    // </DefaultLayout>
    <></>
  );
}

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  // const games = await getGameList();
  // const tmis = await getTMIList();
  const userId = getCookieFromContext(ctx, "userId", "");
  // const token = getCookieFromContext(ctx, "authToken", "");

  if (!userId) {
    return {
      userProfile: null,
    };
  }

  const userProfile: IProfile = await getProfileById({
    id: typeof ctx.query.id === "string" ? ctx.query.id : "",
  });
  console.log(userProfile, ctx.query.id);

  if (userProfile?.Err === "NotExistUser") {
    return {
      notFound: true,
    };
  }

  return {
    userProfile,
  };
};
