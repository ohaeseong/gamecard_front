import { IProfile } from "@/types/Account";
import classNames from "classnames";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
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
          <Image
            className="w-30 h-12 object-contain border rounded cursor-pointer"
            width={48}
            height={48}
            src={`/images/etc/gamecardgg.png`}
            alt={"title_image"}
          />
        </Link>
      </h1>
      {userId && profile ? (
        <Profile profile={profile} />
      ) : (
        <Link
          href="/login"
          className="text-sm font-semibold px-3 border py-2 rounded bg-white-500 text-black border-indigo-500 hover:bg-white hover:text-black-500 transition-colors"
        >
          LOGIN
        </Link>
      )}
    </div>
  );
};

export default Header;
