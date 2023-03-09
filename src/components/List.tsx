import { ILol, IMapleStory, ServicedGames } from "@/types/Game";
import classNames from "classnames";
import ListItem from "./ListItem";

export type IListItem = ILol & IMapleStory;

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  title: string;
  items: Array<IListItem>;
};

const List: React.FC<Props> = ({ className, title, items }) => {
  return (
    <div className={classNames("flex flex-col min-h-[10rem]", className)}>
      <div className="text-lg font-semibold mb-3">{title}</div>
      <div className="space-y-2">
        {items.length === 0 && (
          <div className="w-full h-[10rem] border border-slate-200 rounded flex justify-center items-center">
            <span className="text-slate-500">아직 등록된 포스트가 없어요!</span>
          </div>
        )}
        {items.map((item, index) => (
          <ListItem
            key={`${item.name}-${index}`}
            type={item.gameName}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
