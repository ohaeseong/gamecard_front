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
