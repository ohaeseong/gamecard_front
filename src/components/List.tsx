import classNames from "classnames";
import ListItem from "./ListItem";

export interface IListItem {
  gameType: string;
  content: string;
}

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  title: string;
  items: Array<IListItem>;
};

const List: React.FC<Props> = ({ className, title, items }) => {
  return (
    <div className={classNames("flex flex-col", className)}>
      <div className="text-lg font-semibold mb-3">{title}</div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <ListItem key={`${item.content}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default List;
