import { ILol, IMapleStory, ServicedGames } from "@/types/Game";
import classNames from "classnames";
import { IListItem } from "./List";
import dayjs from "dayjs";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  item: IListItem;
  type: ServicedGames;
};

const ListItem: React.FC<Props> = ({ className, item, type }) => {
  return (
    <>
      {/* {type === ServicedGames.LOL && <Lol item={item} />} */}
      {type === ServicedGames.MapleStory && <MapleStory item={item} />}
    </>
  );
};

type LolProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  item: ILol;
};

const Lol: React.FC<LolProps> = ({ className, item }) => {
  return (
    <div
      className={classNames(
        "flex flex-row items-center cursor-pointer",
        className
      )}
    >
      {/* <div className="w-6 h-6 mr-2 flex justify-center items-center border font-bold bg-indigo-500 text-white rounded">
        {item.gameName[0].toUpperCase()}
      </div> */}

      <div className="flex flex-row w-full border-b justify-between">
        <div className="flex flex-row space-x-1">
          <img
            className="w-6 rounded h-6 mr-1"
            src={item.imageUrl}
            alt="lol_user_profile"
          />
          <span>{item.name} -</span>
          <span>[{item.level}v]</span>
        </div>

        <div>
          <span className="font-semibold mr-2">{item.tier}</span>
          <span>- {dayjs(item.updateTime).format("YYYY-MM-DD")}</span>
        </div>
      </div>
    </div>
  );
};

type MapleStoryProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  item: IMapleStory;
};

const MapleStory: React.FC<MapleStoryProps> = ({ className, item }) => {
  return (
    <div
      className={classNames(
        "flex flex-row items-center cursor-pointer",
        className
      )}
    >
      {/* <div className="w-6 h-6 mr-2 flex justify-center items-center border font-bold bg-indigo-500 text-white rounded">
        {item.gameName[0].toUpperCase()}
      </div> */}

      <div className="flex flex-row w-full border-b justify-between">
        <div className="flex flex-row space-x-1">
          <img
            className="w-6 rounded h-6 mr-1"
            src={item.imageUrl}
            alt="lol_user_profile"
          />
          <span>{item.name} </span>
          <span>{item.job.split('/')[1]} -</span>
          <span>[{item.level}v]</span>
        </div>

        <div>
          <span className="font-semibold mr-2">{item.world}</span>
          <span>- {dayjs(item.updateTime).format("YYYY-MM-DD")}</span>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
