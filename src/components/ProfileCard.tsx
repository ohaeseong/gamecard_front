import { IProfile } from "@/types/Account";
import classNames from "classnames";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  profile: IProfile;
};

const ProfileCard: React.FC<Props> = ({ className }) => {
  return (
    <div className="md:w-[25rem] w-full h-48 bg-slate-50 border shadow-md rounded"></div>
  );
};

export default ProfileCard;
