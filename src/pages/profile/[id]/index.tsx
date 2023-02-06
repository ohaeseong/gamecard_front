import { getGameList, getProfileById, getTMIList } from "@/apis/profile";
import ProfileContainer from "@/containers/ProfileContainer";
import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { IProfile } from "@/types/Account";
import { CategoryItem } from "@/types/Category";
import { getCookieFromContext } from "@/utils/cookie";
import { NextPageContext } from "next";

type Props = {
  games: Array<CategoryItem>;
  tmis: Array<CategoryItem>;
  userProfile: IProfile;
  userId?: string;
};
const ProfilePage = ({ games, tmis, userProfile, userId }: Props) => {
  return (
    <DefaultLayout>
      <ContentsLayout>
        <ProfileContainer
          games={games}
          tmis={tmis}
          profile={userProfile}
          userId={userId}
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

  const userProfile: IProfile = await getProfileById({
    id: ctx.query.id,
  });

  if (userProfile?.Err === "NotExistUser") {
    return {
      notFound: true,
    };
  }

  return {
    games,
    tmis,
    userProfile,
    userId,
  };
};
