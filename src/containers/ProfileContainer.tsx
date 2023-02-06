import Button from "@/components/Button";
import React from "react";
import List from "@/components/List";
import { BsArrowRightShort } from "react-icons/bs";
import Modal from "@/components/Modal";
import { CategoryItem } from "@/types/Category";
import CategorySelector from "@/components/CategorySelector";
import { IProfile } from "@/types/Account";
import ProfileCard from "@/components/ProfileCard";
import classNames from "classnames";

type Props = {
  games: Array<CategoryItem>;
  tmis: Array<CategoryItem>;
  profile: IProfile;
  userId?: string;
};

const ProfileContainer: React.FC<Props> = ({
  games,
  tmis,
  profile,
  userId,
}) => {
  const [openGameBox, setOpenGameBox] = React.useState(false);
  const [openTmiBox, setOpenTmiBox] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState("");

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="space-x-4">
        <ProfileCard profile={profile} />
        <div></div>
      </div>

      <div className="h-10 border mt-6 flex items-center justify-around p-2 space-x-2 font-semibold">
        <span className="text-sky-600 cursor-pointer">Facebook</span>
        <span className="text-sky-400 cursor-pointer">Twitter</span>
        <span className="text-indigo-500 cursor-pointer">Copy URL</span>
      </div>

      <div className="space-y-4 mt-6">
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
          <Button
            className={classNames("mt-2", {
              hidden: profile.id !== userId,
            })}
            onClick={onClickGameButton}
          >
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
          <Button
            className={classNames("mt-2", {
              hidden: profile.id !== userId,
            })}
            onClick={onClickTmiButton}
          >
            T.M.I 추가하기!
          </Button>

          <Modal
            title={
              openGameBox && !openTmiBox
                ? "Games"
                : openTmiBox && !openGameBox
                ? "Tmis"
                : ""
            }
            isOpen={openModal}
            closeModal={toggleModal}
          >
            <CategorySelector
              categories={openGameBox ? games : tmis}
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

  function onClickGameButton() {
    setOpenTmiBox(false);
    setOpenGameBox(true);
    toggleModal();
  }

  function onClickTmiButton() {
    setOpenTmiBox(true);
    setOpenGameBox(false);
    toggleModal();
  }

  function toggleModal() {
    setOpenModal(!openModal);
  }

  function handleSelectedGame(game: string) {
    setSelectedGame(game);
  }
};

export default ProfileContainer;
