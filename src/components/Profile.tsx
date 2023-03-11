import { IProfile } from "@/types/Account";
import { ILol } from "@/types/Game";
import { getGameAbilityFromProfile } from "@/utils/game";
import classNames from "classnames";
import Link from "next/link";
import { IListItem } from "./List";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  profile: IProfile;
};

const Profile: React.FC<Props> = ({ className, profile }) => {
  return (
    <Link href={{ pathname: '/profile/' + profile.id}}>
    <div className="flex flex-row h-full items-center space-x-2">
      <span className="font-semibold text-sm">{profile.id}</span>
      <div className="h-8 w-8 border rounded-full" />
    </div>
    </Link>
  );
};

export default Profile;
