import classNames from "classnames";
import { IListItem } from "./List";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  item: IListItem;
};

const ListItem: React.FC<Props> = ({ className, item }) => {
  return (
    <div
      className={classNames(
        "flex flex-row items-center space-x-2 cursor-pointer",
        className
      )}
    >
      <div className="w-6 h-6 border"></div>
      <div className="w-full border-b">{item.content}</div>
    </div>
  );
};

export default ListItem;
