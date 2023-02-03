/* eslint-disable @next/next/no-img-element */
import { GameItem } from "@/types/Game";
import { Transition, Dialog } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  games: Array<GameItem>;
  selected: string;
  onClick: (game: string) => void;
};

const GameSelector: React.FC<Props> = ({
  className,
  games,
  selected,
  onClick,
}) => {
  return (
    <div className={classNames("flex flex-row justify-around", className)}>
      {games.map((game) => (
        <GameItem
          key={game.name}
          game={game}
          selected={selected === game.name}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

type GameItemProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  game: GameItem;
  selected?: boolean;
  onClick: (game: string) => void;
};

const GameItem: React.FC<GameItemProps> = ({
  className,
  game,
  selected,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "w-44 min-h-[10rem] border transition-colors rounded overflow-hidden cursor-pointer",
        className,
        {
          "border-indigo-300": selected,
        }
      )}
      onClick={() => onClick(game.name)}
    >
      <div className="w-full h-24">
        <img
          className="w-full h-full object-cover"
          src={game.titleUrl}
          alt={game.name}
        />
      </div>

      <div className="mt-2 px-1 flex flex-row justify-between">
        <span>{game.name}</span>

        <img
          className="w-6 h-6 object-cover"
          src={game.logoURl}
          alt={game.name}
        />
      </div>
    </div>
  );
};

export default GameSelector;
