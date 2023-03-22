import { getProfileById } from "@/apis/profile";
import CardEditContainer from "@/containers/CardEditContainer";
import { IProfile } from "@/types/Account";
import { getCookieFromContext } from "@/utils/cookie";
import { NextPageContext } from "next";

type Props = {
  userProfile: IProfile;
  userId: string;
  authToken: string;
};

const CardEditPage = ({ userId, authToken, userProfile }: Props) => {
  return (
    <>
      <CardEditContainer
        authToken={authToken}
        userId={userId}
        userProfile={userProfile}
      />
    </>
  );
};

export default CardEditPage;

CardEditPage.getInitialProps = async (ctx: NextPageContext) => {
  const userId = getCookieFromContext(ctx, "userId", "");
  const token = getCookieFromContext(ctx, "authToken", "");

  const userProfile: IProfile = await getProfileById({
    id: userId,
  });

  return {
    userProfile,
    userId,
    authToken: token,
  };
};
