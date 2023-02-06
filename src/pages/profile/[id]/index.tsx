import { getGameList } from "@/apis/game";
import { getProfileById } from "@/apis/profile";
import { getTMIList } from "@/apis/tmi";
import ProfileContainer from "@/containers/ProfileContainer";
import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { IProfile } from "@/types/Account";
import { CategoryItem } from "@/types/Category";
import { getCookieFromContext } from "@/utils/cookie";
import { NextPageContext } from "next";

type Props = {
  gameTypes: Array<CategoryItem>;
  tmiTypes: Array<CategoryItem>;
  userProfile: IProfile;
  userId?: string;
  token?: string;
};
const ProfilePage = ({
  gameTypes,
  tmiTypes,
  userProfile,
  userId,
  token,
}: Props) => {
  return (
    <DefaultLayout>
      <ContentsLayout>
        <ProfileContainer
          gameTypes={gameTypes}
          tmiTypes={tmiTypes}
          profile={userProfile}
          userId={userId}
          token={token}
        />
      </ContentsLayout>
    </DefaultLayout>
  );
};

export default ProfilePage;

ProfilePage.getInitialProps = async (ctx: NextPageContext) => {
  const games = await getGameList();
  const tmis = await getTMIList();
  const userId = getCookieFromContext(ctx, "userId", "");
  const token = getCookieFromContext(ctx, "authToken", "");

  const userProfile: IProfile = await getProfileById({
    id: typeof ctx.query.id === "string" ? ctx.query.id : "",
  });

  if (userProfile?.Err === "NotExistUser") {
    return {
      notFound: true,
    };
  }

  return {
    gameTypes: games,
    tmiTypes: tmis,
    userProfile,
    userId,
    token,
  };
};
