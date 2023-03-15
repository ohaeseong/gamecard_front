/* eslint-disable @next/next/no-img-element */
import React from "react";
import classNames from "classnames";
import { IListItem } from "./List";
import { AiOutlinePlus } from "react-icons/ai";
import { IProfile } from "@/types/Account";
import Modal from "./Modal";
import { requestAddGame } from "@/apis/game";
import { ServicedGames } from "@/types/Game";
import { Nullable } from "@/utils/utileTypes";
import Image from "next/image";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  games: Array<IListItem>;
  token?: string;
  profile: IProfile;
  selectedProfileGame: string;
  handleProfileGame: (game: ServicedGames) => void;
  addGameCharacter: (
    profile: IProfile,
    seletedGame: string,
    gameUserName: string,
    token: string
  ) => any;
};

const ProfileCard: React.FC<Props> = ({
  className,
  games: _games,
  token,
  profile,
  selectedProfileGame,
  handleProfileGame,
  addGameCharacter,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [gameUserName, setGameUserName] = React.useState("");
  const [seletedGame, setSeletedGame] =
    React.useState<Nullable<ServicedGames>>();
  const games = _games.filter((game) => game.level);

  const profileGame = games.filter(
    (game) => game.gameName === selectedProfileGame
  )[0];

  return (
    <>
      <div className="flex flex-row items-center">
        <div
          className={classNames(
            "w-full lg:min-h-[320px] border min-h-[200px] rounded-xl bg-no-repeat bg-center bg-cover flex flex-col justify-end p-3",
            className
          )}
          style={{
            backgroundImage: getProfileCardBackgroundImage(),
          }}
        >
          {games.length === 0 ? (
            <div className="w-full lg:min-h-[320px] min-h-[200px] flex justify-center items-center">
              <h1 className="text-xl font-semibold text-indigo-300">{`캐릭터를 등록해주세요`}</h1>
            </div>
          ) : (
            <>
              {selectedProfileGame === "maplestory" && (
                <div className="flex justify-between items-end">
                  <div className="w-fit h-fit bg-slate-200 rounded py-1 px-3 text-white flex items-center space-x-1">
                    <span className="text-lg font-semibold flex items-center justify-center text-indigo-500 capitalize">
                      # {selectedProfileGame}
                    </span>
                    <span className="text-sm text-indigo-500">
                      {" "}
                      - Lv {profileGame?.level}
                    </span>
                  </div>
                  <div className="w-40 h-40 border relative bg-white rounded flex flex-col justify-between items-center">
                    <span className="mt-2 text-xs">
                      {`${profileGame.world} - ${
                        profileGame.job.split("/")[1]
                      }`}
                    </span>
                    <img
                      className="bg-contain absolute"
                      src={profileGame.imageUrl}
                      alt="maplestory user image"
                    />
                    <span className="mb-2 text-xs">{`${profileGame.name}`}</span>
                  </div>
                </div>
              )}
              {selectedProfileGame === "lostark" && (
                <div className="flex justify-between items-end">
                  <div className="w-fit h-fit bg-slate-200 rounded py-1 px-3 text-white flex items-center space-x-1">
                    <span className="text-lg font-semibold flex items-center justify-center text-indigo-500 capitalize">
                      # {selectedProfileGame}
                    </span>
                    <span className="text-sm text-indigo-500">
                      {" "}
                      - {profileGame?.level}
                    </span>
                  </div>
                  <div className="w-40 h-50 border relative bg-white rounded flex flex-col justify-between items-center">
                    <span className="my-2 text-xs">
                      {`${profileGame.world} - ${profileGame.job}`}
                    </span>
                    <img
                      className="bg-contain"
                      src={profileGame.imageUrl}
                      alt="maplestory user image"
                    />
                    <span className="my-2 text-xs">{`${profileGame.name}`}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-20 h-[90%] rounded-r-xl shadow-xl justify-evenly items-center bg-slate-100 flex flex-col">
          {games.map((game) => (
            <div
              className="cursor-pointer"
              key={game.gameName}
              onClick={() => handleProfileGame(game.gameName)}
            >
              <Image
                className="rounded"
                src={`/images/symbols/${game.gameName}_icon.jpg`}
                width={50}
                height={50}
                alt={game.gameName}
              />
            </div>
          ))}
          {games.length > 2 && (
            <div
              className="w-12 border border-slate-300 h-12 rounded flex justify-center items-center cursor-pointer"
              onClick={toggleModal}
            >
              <AiOutlinePlus color="#808080" />
            </div>
          )}
        </div>
      </div>

      {openModal && (
        <Modal
          className="w-[750px]"
          title={!seletedGame ? "게임 선택" : "캐릭터 등록"}
          isOpen={openModal}
          closeModal={toggleModal}
        >
          <div className="min-h-[160px] flex items-center justify-center flex-col mt-4">
            {!seletedGame ? (
              <div className="w-full h-full flex flex-row justify-evenly">
                {Object.values(ServicedGames).map((game) => (
                  <div
                    key={game}
                    className="w-40 h-52"
                    onClick={handleGame(game)}
                  >
                    <Image
                      className="bg-cover cursor-pointer rounded"
                      width={160}
                      height={176}
                      alt={`${game} title image`}
                      src={`/images/titles/${game}.jpg`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-row">
                <span className="text-indigo-600">닉네임:</span>
                <input
                  className="focus:outline-none border rounded ml-2 pl-1 text-sm w-40"
                  onChange={handleUserName}
                  value={gameUserName}
                />
                <button
                  className="bg-indigo-600 text-white px-2 rounded ml-2 text-sm"
                  onClick={requestAddGameCharacter}
                >
                  검색
                </button>
              </div>
            )}
            {loading && (
              <span className="text-xl mt-8 text-slate-400">Loading...</span>
            )}
          </div>
        </Modal>
      )}
    </>
  );

  function toggleModal() {
    setOpenModal(!openModal);
    setSeletedGame(null);
    setGameUserName("");
  }

  function handleUserName(event: React.ChangeEvent<HTMLInputElement>) {
    setGameUserName(event.target.value);
  }

  function handleGame(game: ServicedGames) {
    return () => {
      setSeletedGame(game);
    };
  }

  async function requestAddGameCharacter() {
    if (!token) {
      window.alert("로그인 후 다시 시도 해주세요");
      return;
    }

    if (!gameUserName || !seletedGame) {
      window.alert("양식을 지켜주세요");
      return;
    }

    setLoading(true);

    const response = await addGameCharacter(
      profile,
      seletedGame,
      gameUserName,
      token
    );

    if (response) {
      if (!response.name) {
        window.alert("캐릭터를 찾지 못했습니다.");
      }

      setLoading(false);

      toggleModal();
      handleGame(seletedGame);
      handleProfileGame(seletedGame);
    }
  }

  function getProfileCardBackgroundImage() {
    if (games.length === 0) {
      return "";
    }

    if (selectedProfileGame === "maplestory") {
      return "url(/images/cover/maple_cover_2.png)";
    }

    if (selectedProfileGame === "lostark") {
      return "url(/images/cover/lostark_cover.jpg)";
    }
  }
};

export default ProfileCard;
