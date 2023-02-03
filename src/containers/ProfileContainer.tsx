import Button from "@/components/Button";
import React from "react";
import GameCard from "@/components/GameCard";
import List from "@/components/List";
import { BsArrowRightShort } from "react-icons/bs";
import TitleGameBox from "@/components/GameSelector";
import { GameItem } from "@/types/Game";
import Modal from "@/components/Modal";
import GameSelector from "@/components/GameSelector";

type Props = {
  games: Array<GameItem>;
};

const ProfileContainer: React.FC<Props> = ({ games }) => {
  const [openTitleBox, setOpenTitleBox] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState("");

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="space-x-4">
        <GameCard />
        <div></div>
      </div>

      <div className="h-10 border mt-6 flex items-center justify-around p-2 space-x-2 font-semibold">
        <span className="text-sky-600 cursor-pointer">Facebook</span>
        <span className="text-sky-400 cursor-pointer">Twitter</span>
        <span className="text-indigo-500 cursor-pointer">Copy URL</span>
      </div>

      <div className="space-y-4 mt-4">
        <div>
          <List
            title="Games"
            items={[
              {
                gameType: "LOL",
                content: "포탑내자가격리",
              },
              {
                gameType: "LOL",
                content: "포탑내자가격리",
              },
            ]}
          />
          <Button className="mt-2" onClick={addGame}>
            Game 추가하기!
          </Button>
        </div>
        <div>
          <List
            title="T.M.I"
            items={[
              {
                gameType: "LOL",
                content: "포탑내자가격리",
              },
              {
                gameType: "LOL",
                content: "포탑내자가격리",
              },
            ]}
          />
          <Button className="my-2" onClick={openModal}>
            T.M.I 추가하기!
          </Button>

          <Modal title="Games" isOpen={openTitleBox} closeModal={closeModal}>
            <GameSelector
              games={games}
              selected={selectedGame}
              onClick={handleSelectedGame}
            />

            <div className="w-full flex justify-end pr-1 mt-4">
              <BsArrowRightShort cursor="pointer" color="gray" size={35} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );

  function addGame() {}

  function addTMI() {}

  function closeModal() {
    setOpenTitleBox(false);
  }

  function openModal() {
    setOpenTitleBox(true);
  }

  function handleSelectedGame(game: string) {
    console.log(game);

    setSelectedGame(game);
  }
};

export default ProfileContainer;
