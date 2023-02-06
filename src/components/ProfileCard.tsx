import { IProfile } from "@/types/Account";
import { ILol } from "@/types/Game";
import { getGameAbilityFromProfile } from "@/utils/game";
import classNames from "classnames";
import { IListItem } from "./List";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  profile: IProfile;
};

const ProfileCard: React.FC<Props> = ({ className, profile }) => {
  const games = getGameAbilityFromProfile<IListItem>(profile.games);
  console.log(games);

  return (
    <div className="md:w-[27rem] w-full h-52 p-3 flex-col bg-slate-50 border shadow-md rounded flex">
      <div className="h-10 w-full flex items-center font-semibold">
        <div className="w-6 h-6 mr-2 flex justify-center items-center border font-bold bg-indigo-500 text-white rounded">
          {profile.id[0].toUpperCase()}
        </div>
        {profile.id}
      </div>
      <div className="h-24 w-full flex flex-row items-center justify-around">
        {games.map((game: ILol) => (
          <div
            key={game.name}
            className="flex flex-col items-center space-y-0.5"
          >
            <img className="h-10 w-10 rounded" src={game.imageUrl} alt="game" />
            <span className="text-sm">{game.name}</span>
            <span className="text-sm font-semibold">
              {game.tier}-[{game.level}]
            </span>
          </div>
        ))}
      </div>
      <div className="h-10 w-full flex items-center justify-end text-slate-400">
        Followers: {profile.friendCount}
      </div>
    </div>
  );
};

export default ProfileCard;
