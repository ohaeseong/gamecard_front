import { getProfileById } from "@/apis/profile";
import ProfileContainer from "@/containers/ProfileContainer";
import { IProfile } from "@/types/Account";
import { getCookieFromContext } from "@/utils/cookie";
import { NextPageContext } from "next";

type Props = {
  userProfile: IProfile;
  userId?: string;
  authToken?: string;
};
const ProfilePage = ({ userProfile, userId, authToken }: Props) => {
  return (
    <ProfileContainer
      userProfile={userProfile}
      userId={userId}
      authToken={authToken}
    />
  );
};

export default ProfilePage;

ProfilePage.getInitialProps = async (ctx: NextPageContext) => {
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
    userProfile,
    userId,
    authToken: token,
  };
};
