import Button from "@/components/Button";
import React from "react";
import List, { IListItem } from "@/components/List";
import { BsArrowRightShort } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Modal from "@/components/Modal";
import { CategoryItem } from "@/types/Category";
import CategorySelector from "@/components/CategorySelector";
import { IProfile } from "@/types/Account";
import ProfileCard from "@/components/ProfileCard";
import classNames from "classnames";
import { IGame } from "@/types/Game";
import { isEmpty } from "lodash";
import Input from "@/components/Input";
import { requestAddTmi, requestUpdateTmi } from "@/apis/tmi";
import { requestAddGame } from "@/apis/game";
import { getGameAbilityFromProfile } from "@/utils/game";
import { useRouter } from "next/router";

type Props = {
  gameTypes: Array<CategoryItem>;
  tmiTypes: Array<CategoryItem>;
  profile: IProfile;
  userId?: string;
  token?: string;
};

const ProfileContainer: React.FC<Props> = ({
  gameTypes,
  tmiTypes,
  profile,
  userId,
  token,
}) => {
  const router = useRouter();

  const [openGameBox, setOpenGameBox] = React.useState(false);
  const [, setOpenTmiBox] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [essential, setEssential] = React.useState("");

  const [showForm, setShowForm] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const [tmis, setTmis] = React.useState(profile.tmi);

  const userGames = getGameAbilityFromProfile<IListItem>(profile.games);

  const [games] = React.useState(userGames);

  const [tmiUpdateIndex, setTmiUpdateIndex] = React.useState(-1);
  return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="space-x-4">
        <ProfileCard profile={profile} />
      </div>

      <div className="h-10 border mt-6 flex items-center justify-around p-2 space-x-2 font-semibold">
        <span className="text-sky-600 cursor-pointer">Facebook</span>
        <span className="text-sky-400 cursor-pointer">Twitter</span>
        <span className="text-indigo-500 cursor-pointer" onClick={copyUrl}>
          Copy URL
        </span>
      </div>

      <div className="space-y-4 mt-6">
        <div>
          <List title="Games" items={games} />
          <Button
            className={classNames("mt-2", {
              hidden: profile.id !== userId || token === "undefined",
            })}
            onClick={onClickGameButton}
          >
            Game 추가하기!
          </Button>
        </div>
        <div>
          <div className="flex flex-col min-h-[10rem]">
            <div className="text-lg font-semibold mb-3">T.M.I</div>
            <div className="space-y-2">
              {tmis.length === 0 && (
                <div className="w-full h-[10rem] border border-slate-200 rounded flex justify-center items-center">
                  <span className="text-slate-500">
                    아직 등록된 포스트가 없어요!
                  </span>
                </div>
              )}
              {tmis.map((tmi, index) => (
                <div
                  key={tmi.name + index}
                  className="flex flex-row border-b cursor-pointer justify-between"
                >
                  <div className="flex flex-row">
                    <div className="w-6 h-6 mr-2 flex justify-center items-center border font-bold bg-indigo-500 text-white rounded">
                      {tmi.name[0].toUpperCase()}
                    </div>
                    <span>{tmi.content}</span>
                  </div>

                  <FiEdit
                    className={classNames("h-5 w-5 mr-1", {
                      hidden: profile.id !== userId || token === "undefined",
                    })}
                    onClick={() => {
                      setTmiUpdateIndex(index);
                      onClickTmiButton();
                      setEssential(tmi.content);
                    }}
                    color="gray"
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            className={classNames("mt-2", {
              hidden: profile.id !== userId || token === "undefined",
            })}
            onClick={onClickTmiButton}
          >
            T.M.I 추가하기!
          </Button>

          {openGameBox ? (
            <Modal title="Game Box" isOpen={openModal} closeModal={toggleModal}>
              {!showForm ? (
                <CategorySelector
                  categories={gameTypes}
                  selected={selectedCategory}
                  onClick={handleSelectedGame}
                />
              ) : (
                <div className="h-[12rem] w-full flex flex-col items-center justify-center">
                  <Input
                    placeholder="게임 닉네임"
                    onChange={handleEssentialForm}
                    value={essential}
                  />

                  <Button className="w-32 mt-6" onClick={handleGame}>
                    추가하기
                  </Button>
                </div>
              )}

              <div className="w-full flex justify-end pr-1 mt-4">
                <BsArrowRightShort
                  className={classNames(
                    "hover:fill-indigo-500 transition-colors",
                    {
                      hidden: showForm,
                    }
                  )}
                  cursor="pointer"
                  color="gray"
                  size={35}
                  onClick={() => setShowForm(true)}
                />
              </div>
            </Modal>
          ) : (
            <Modal title="T.M.I" isOpen={openModal} closeModal={toggleModal}>
              {!showForm ? (
                <CategorySelector
                  categories={tmiTypes}
                  selected={selectedCategory}
                  onClick={handleSelectedGame}
                />
              ) : (
                <div className="h-[12rem] w-full flex flex-col items-center justify-center">
                  <Input
                    className="w-96"
                    placeholder="나의 T.M.I"
                    onChange={handleEssentialForm}
                    value={essential}
                  />

                  <Button className="w-96 mt-6" onClick={handleTMI}>
                    {!tmiUpdateIndex ? "추가하기" : "수정하기"}
                  </Button>
                </div>
              )}

              <div className="w-full flex justify-end pr-1 mt-4">
                <BsArrowRightShort
                  className={classNames(
                    "hover:fill-indigo-500 transition-colors",
                    {
                      hidden: showForm,
                    }
                  )}
                  cursor="pointer"
                  color="gray"
                  size={35}
                  onClick={() => setShowForm(true)}
                />
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );

  function handleEssentialForm(e: React.ChangeEvent<HTMLInputElement>) {
    setEssential(e.target.value);
  }

  function onClickGameButton() {
    setOpenTmiBox(false);
    setOpenGameBox(true);
    setShowForm(false);
    toggleModal();
  }

  function onClickTmiButton() {
    setOpenTmiBox(true);
    setOpenGameBox(false);
    setShowForm(false);
    toggleModal();
  }

  function toggleModal() {
    setSelectedCategory("");
    setEssential("");
    setOpenModal(!openModal);
  }

  function handleSelectedGame(game: string) {
    setSelectedCategory(game);
  }

  async function handleTMI() {
    if (!token) {
      window.alert("로그인 후 다시시도 해주세요!");
      return;
    }

    if (!essential || !selectedCategory) {
      window.alert("양식을 지켜주세요!");
      return;
    }

    if (tmiUpdateIndex === -1) {
      const response = await requestAddTmi({
        id: profile.id,
        tmiName: selectedCategory,
        tmiContent: essential,
        authToken: token,
      });
      setTmis(response.tmi || []);
    } else {
      const response = await requestUpdateTmi({
        id: profile.id,
        tmiName: selectedCategory,
        tmiContent: essential,
        authToken: token,
        tmiIndex: tmiUpdateIndex,
      });

      setTmis((tmis) => {
        tmis[tmiUpdateIndex] = response.tmi[0];

        return tmis;
      });
      setTmiUpdateIndex(-1);
    }
    toggleModal();
  }

  async function handleGame() {
    if (!token) {
      window.alert("로그인 후 다시시도 해주세요!");
      return;
    }

    if (!essential || !selectedCategory) {
      window.alert("양식을 지켜주세요!");
      return;
    }

    const response = await requestAddGame({
      id: profile.id,
      gameName: selectedCategory,
      gameUser: essential,
      authToken: token,
    });
    console.log(response);

    toggleModal();
  }

  function copyUrl() {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      navigator.clipboard.writeText(`http://${hostname}${router.asPath}`);

      window.alert("카피 완료!");
    }
  }
};

export default ProfileContainer;
