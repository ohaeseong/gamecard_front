import { getProfileById } from "@/apis/profile";
import ProfileContainer from "@/containers/ProfileContainer";
import { IProfile } from "@/types/Account";
import { getCookieFromContext } from "@/utils/cookie";
import { NextPageContext } from "next";

type Props = {
  userProfile: IProfile;
  userId?: string;
  loginedUserId?: string;
  authToken?: string;
};
const ProfilePage = ({
  userProfile,
  userId,
  authToken,
  loginedUserId,
}: Props) => {
  return (
    <ProfileContainer
      userProfile={userProfile}
      userId={userId}
      loginedUserId={loginedUserId}
      authToken={authToken}
    />
  );
};

export default ProfilePage;

ProfilePage.getInitialProps = async (ctx: NextPageContext) => {
  const userId = ctx.query.id;
  const loginedUserId = getCookieFromContext(ctx, "userId", "");
  const token = getCookieFromContext(ctx, "authToken", "");

  if (userId) {
    const userProfile: IProfile = await getProfileById({
      id: typeof ctx.query.id === "string" ? ctx.query.id : "",
    });

    if (userProfile?.Err === "NotExistUser" && ctx.res) {
      ctx.res.statusCode = 404;
      ctx.res.end("Not found");
      return;
    }

    return {
      userProfile,
      userId,
      loginedUserId,
      authToken: token,
    };
  }

  return {
    userProfile: {},
    userId,
    loginedUserId,
    authToken: token,
  };
};
