import { IProfile } from "@/types/Account";
import classNames from "classnames";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Profile from "./Profile";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  profile?: IProfile;
};

const Header: React.FC<Props> = ({ className, profile }) => {
  const [userId, setUserId] = React.useState<undefined | string>("");
  const userIdFromCookie = Cookies.get("userId");

  React.useEffect(() => {
    setUserId(userIdFromCookie);
  }, [userIdFromCookie]);

  return (
    <div
      className={classNames(
        "min-h-[56px] border-b w-full flex flex-row px-4 items-center justify-between",
        className
      )}
    >
      <h1 className="text-lg font-bold text-indigo-600">
        <Link href="/">
        <img
              className="w-30 h-12 object-contain border rounded cursor-pointer"
              key={`/images/etc/img2.png`}
              src={`/images/etc/img2.png`}
              alt={"title_image"}
            />

        </Link>
      </h1>
      {userId && profile ? (
        <Profile profile={profile} />
      ) : (
        <Link
          href="/login"
          className="text-sm font-semibold px-3 border py-2 rounded bg-indigo-500 text-white border-indigo-500 hover:bg-white hover:text-indigo-500 transition-colors"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Header;
