import React from "react";
import classNames from "classnames";
import { IListItem } from "./List";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  // profile: IProfile;
  games: Array<IListItem>;
};

const ProfileCard: React.FC<Props> = ({ className, games }) => {
  const maple = games.filter((game) => game.gameName === "maplestory")[0];
  const [seletedGame, setSeletedGame] = React.useState(games[0]);

  return (
    <div className="flex flex-row items-center">
      <div
        className={classNames(
          "w-full lg:min-h-[320px] min-h-[200px] rounded-xl bg-no-repeat bg-center flex flex-col justify-end p-3",
          className
        )}
        style={{
          backgroundImage: `url(/images/cover/maple_cover.jpg)`,
        }}
      >
        <div className="w-fit bg-slate-600 rounded py-1 px-3 text-white flex items-center space-x-1">
          <span className="text-lg font-semibold"># {maple?.name}</span>
          <span className="text-base"> - Lv {maple?.level}</span>
        </div>
      </div>
      <div className="w-20 h-[90%] border rounded-r-xl bg-slate-500 flex flex-col">
        {games.map((game) => (
          <div key={game.gameName}></div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
