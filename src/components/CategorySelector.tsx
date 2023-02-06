/* eslint-disable @next/next/no-img-element */
import { CategoryItem } from "@/types/Category";
import classNames from "classnames";
import React, { Fragment } from "react";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  categories: Array<CategoryItem>;
  selected: string;
  onClick: (game: string) => void;
};

const CategorySelector: React.FC<Props> = ({
  className,
  categories,
  selected,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-row justify-around space-x-4",
        className
      )}
    >
      {categories.map((categorie) => (
        <Item
          key={categorie.name}
          game={categorie}
          selected={selected === categorie.name}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

type ItemProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  game: CategoryItem;
  selected?: boolean;
  onClick: (game: string) => void;
};

const Item: React.FC<ItemProps> = ({ className, game, selected, onClick }) => {
  return (
    <div
      className={classNames(
        "w-52 min-h-[12rem] border-2 transition-colors rounded overflow-hidden cursor-pointer",
        className,
        {
          "border-indigo-400": selected,
        }
      )}
      onClick={() => onClick(game.name)}
    >
      <div className="w-full h-24 border-b">
        <img
          className="w-full h-full object-cover"
          src={game.titleUrl}
          alt={game.name}
        />
      </div>

      <div className="mt-2 px-1 flex flex-row justify-between">
        <span className="capitalize">{game.name}</span>

        <img
          className="w-6 h-6 object-cover"
          src={game.logoUrl}
          alt={game.name}
        />
      </div>
    </div>
  );
};

export default CategorySelector;
