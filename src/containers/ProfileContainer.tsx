/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  addImage,
  addImageWithUrl,
  createAiImage,
  getAiImageUrl,
  IAiImageInput,
  IGetAiImageUrl,
  IImageDelete,
  IImageInput,
  IImageUrlInput,
  IRemoveImageUrlInput,
  removeAiImageUrl,
  removeImage,
} from "@/apis/image";
import ImageList from "@/components/ImageList";
import { IListItem } from "@/components/List";
import ProfileCard from "@/components/ProfileCard";
import ContentsLayout from "@/layouts/ContentsLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { IProfile } from "@/types/Account";
import { getGameAbilityFromProfile } from "@/utils/game";
import Modal from "@/components/Modal";
import {
  femaleClothMap,
  IAiImageResponse,
  IImageResponse,
  maleClothMap,
} from "@/types/Image";
import DropdownMenu from "@/components/DropdownMenu";
import { IMapleInfoResponse, ServicedGames } from "@/types/Game";
import { getMapleInfo, requestAddGame } from "@/apis/game";
import { Nullable } from "@/utils/utileTypes";
import { getProfileById } from "@/apis/profile";
import classNames from "classnames";
import { deleteCookie } from "@/hooks/cookie";
import { useRouter } from "next/router";
import { isBrowser } from "@/utils/browser";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import GameCard from "@/components/GameCard";

const colorOptions = [
  { label: "검정색", value: "black" },
  { label: "흰색", value: "white" },
  { label: "빨간색", value: "red" },
  { label: "파란색", value: "blue" },
  { label: "노란색", value: "yellow" },
  { label: "녹색", value: "green" },
  { label: "핑크색", value: "pink" },
  { label: "오랜지색", value: "orange" },
  { label: "바이올랫색", value: "violet" },
  { label: "갈색", value: "brown" },
  { label: "회색", value: "gray" },
  { label: "보라색", value: "purple" },
  { label: "회색", value: "blonde" },
];

type Props = {
  userProfile: IProfile;
  logindUserProfile?: IProfile;
  userId?: string;
  loginedUserId?: string;
  authToken?: string;
};
const ProfileContainer = ({
  userProfile: _userProfile,
  logindUserProfile,
  authToken,
  userId,
  loginedUserId,
}: Props) => {
  const router = useRouter();
  const [userProfile, setUserProfile] = React.useState(_userProfile);
  const games = getGameAbilityFromProfile<IListItem>(userProfile.games);
  const femaleCloths = Object.keys(femaleClothMap);
  const maleCloths = Object.keys(maleClothMap);

  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openGeneratedModal, setGeneratedOpenModal] = React.useState(false);

  const [aiGender, setAiGender] = React.useState("boy");
  const [eyesColor, setEyesColor] = React.useState("black");
  const [hairColor, setHairColor] = React.useState("black");
  const [cloths, setCloths] = React.useState(maleCloths);
  const [selectedCloth, setSelectedCloth] = React.useState("");

  const [tickets, setTickets] = React.useState(0);
  const [genImageUrl, setGenImageUrl] = React.useState("");

  const [wait, setWait] = React.useState<Nullable<number>>();

  const game = games.filter((game) => game.level);

  const [selectedProfileGame, setSelectedProfileGame] = React.useState(
    game[0]?.gameName || ""
  );

  const profileGame = games.filter(
    (game) => game.gameName === selectedProfileGame
  )[0];

  const _gallery = games.filter(
    (game) => game.gameName === selectedProfileGame
  )[0]?.gallery;

  const [gallery, setGallery] = React.useState<Array<string | null>>([]);

  React.useEffect(() => {
    if (selectedProfileGame) {
      const _gallery = games.filter(
        (game) => game.gameName === selectedProfileGame
      )[0]?.gallery;

      setGallery(_gallery);
    }
  }, [selectedProfileGame]);

  React.useEffect(() => {
    if (isBrowser()) {
      setTickets(Number(localStorage.getItem("tickets")));
    }
  }, []);

  return (
    <DefaultLayout profile={logindUserProfile}>
      <ContentsLayout className="mt-2">
        {!profileGame ? (
          <div className="h-64 w-full flex flex-row border-b border-zinc-700">
            <div className="basis-1/2 h-full flex flex-col text-zinc-400 justify-center">
              <div className="flex flex-col">
                <h1 className="text-white text-3xl font-bold">
                  내 게임 정보를 카드 한장으로!
                </h1>
                <span className="text-sm mt-2">
                  롤, 메이플, 로스트 아크 등등 여러 게임 정보를 한눈에
                  보여주세요!
                </span>
                <span className="text-sm">
                  내 게임 캐릭터로 그리는 그림까지! 지금 확인해보세요!
                </span>
                <Link
                  className="bg-indigo-600 text-white text-sm mt-2 w-fit px-2 py-1 rounded"
                  href="/card/edit"
                >
                  카드 등록 하기
                </Link>
              </div>
            </div>
            <div className="basis-1/2 h-full flex justify-center">
              <Image
                className="object-contain"
                src="/images/cover/Gekko_Artwork_Full.png"
                width={200}
                height={200}
                alt="gekko"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-between">
              <h1 className="text-xl font-bold text-indigo-400 mt-4">
                카드 리스트
              </h1>
              {game.length < 2 && (
                <Link
                  className="bg-indigo-600 text-white text-sm mt-2 w-fit px-2 py-1 rounded"
                  href="/card/edit"
                >
                  카드 등록 하기
                </Link>
              )}
            </div>
            <div className="w-full p-2 flex flex-row space-x-3 border border-zinc-700 mt-2">
              {game.map((game) => (
                <div
                  key={game.gameName}
                  onClick={() => handleProfileGame(game.gameName)}
                >
                  <GameCard
                    className="transform hover:-translate-y-4 transition-transform cursor-pointer"
                    type={game.gameName}
                    data={game}
                    selected={game.gameName === selectedProfileGame}
                    size="w-[300px] h-[420px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <div className="w-full mt-8 flex flex-row justify-between items-center">
          <div className="flex space-x-2 items-center">
            <span className="text-xl font-bold text-indigo-400">
              갤러리 {selectedProfileGame && <span>-</span>}
            </span>
            {selectedProfileGame && (
              <span className="text-xs font-bold text-indigo-500 relative group">
                <button
                  className="p-2 py-2 bg-indigo-600 text-white w-full rounded"
                  onClick={handleDynamicUrl}
                >
                  Dynamic Url: i.gamecard.gg/{profileGame?.gameName}?id=
                  {userProfile.id}
                </button>

                <span className="absolute p-2 group-hover:block hidden w-64 top-0 bg-indigo-600 text-white rounded -right-[265px]">
                  해당 URL을 통해 내 갤러리에 저장된 사진 중 하나를 랜덤으로
                  보여줄 수 있습니다.
                </span>
              </span>
            )}
          </div>
          {loginedUserId === userProfile?.id && authToken && (
            <div className="flex space-x-2 items-center">
              <button
                className="border border-indigo-600 text-sm px-3 py-2 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer bg-indigo-600 text-white rounded"
                onClick={toggleModal}
              >
                이미지 생성
              </button>
              <button
                className="border border-indigo-600 text-sm px-3 py-2 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer bg-indigo-600 text-white rounded"
                onClick={requestGetAiImageUrl}
              >
                이미지 받기
              </button>
            </div>
          )}
        </div>
        <ImageList
          className="mt-4"
          images={gallery}
          uploadImage={requestAddImage}
          deleteImage={deleteImage}
        />

        <Modal
          className="w-[750px]"
          title="이미지 생성 옵션"
          isOpen={openModal}
          closeModal={toggleModal}
        >
          <>
            {
              <div className="flex flex-row justify-between">
                <div className="w-56 relative flex flex-col items-center justify-center">
                  <img
                    className="object-contain w-56 h-56 mt-1"
                    src={profileGame?.imageUrl}
                    alt="maple_profile_image"
                  />
                  <span className={classNames("mt-2 text-sm text-white")}>{`${
                    profileGame?.name
                  } - ${
                    profileGame?.job?.split("/")[1] || profileGame?.job
                  }`}</span>
                </div>
                <div className="py-2 ml-4 flex flex-col items-center">
                  <div className="flex flex-row justify-center items-center space-x-2 text-white">
                    <span>캐릭터 성별: </span>
                    <label>남성</label>
                    <input
                      type="radio"
                      onChange={handleAiGender}
                      value="boy"
                      checked={aiGender === "boy"}
                    />
                    <label>여성</label>
                    <input
                      type="radio"
                      onChange={handleAiGender}
                      value="girl"
                      checked={aiGender === "girl"}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-row space-x-2 justify-center items-center text-white">
                      <span className="text-sm">눈동자 색상 선택 :</span>
                      <DropdownMenu
                        className="z-50"
                        menus={colorOptions}
                        selected={eyesColor}
                        onClick={handleEyesColor}
                      />
                      <span className="text-sm">머리카락 색상 선택 :</span>
                      <DropdownMenu
                        menus={colorOptions}
                        selected={hairColor}
                        onClick={handleHairColor}
                      />
                    </div>
                    <span className="text-xs text-zinc-400 mt-4 inline-block">
                      - 원본 캐릭터와 다른 색상을 선택하면 정확도와 인식률이
                      대폭 하락합니다.
                    </span>
                    <br />
                    <span className="text-xs text-zinc-400">
                      - 남은 AI 이미지 생성 티켓 갯수: {tickets}
                    </span>
                    {/* <div className="mt-4">
                      <span className="text-sm">의상 선택 : </span>
                      <DropdownMenu
                        menus={cloths}
                        selected={selectedCloth}
                        onClick={handleCloth}
                      />
                    </div> */}
                  </div>

                  <button
                    className="p-2 py-2 bg-indigo-600 mt-14 text-sm text-white w-full rounded"
                    onClick={requestCreateAiImage}
                  >
                    {loading ? "Loading..." : "이미지 생성"}
                  </button>
                </div>
              </div>
            }
          </>
        </Modal>

        <Modal
          title="생성된 이미지를 확인하세요"
          isOpen={openGeneratedModal}
          closeModal={toggleGeneratedModal}
        >
          <>
            {genImageUrl != "" && (
              <div className="w-full flex justify-center items-center flex-col">
                <img
                  className="object-contain"
                  src={genImageUrl}
                  alt="maple_profile_image"
                />

                <div className="flex flex-row space-x-2 w-full">
                  <button
                    className="p-2 py-2 bg-indigo-500 mt-14 text-sm text-white w-full rounded"
                    onClick={saveGeneratedImage}
                  >
                    저장하기
                  </button>
                  <button
                    className="p-2 py-2 bg-indigo-500 mt-14 text-sm text-white w-full rounded"
                    onClick={deleteGeneratedImage}
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </>
        </Modal>
      </ContentsLayout>
    </DefaultLayout>
  );

  async function deleteImage(imageIndex: number) {
    if (!userId || !authToken) {
      window.alert("로그인이 필요합니다");
      return;
    }

    const params: IImageDelete = {
      id: userId,
      authToken,
      gameName: selectedProfileGame,
      imageIndex,
    };

    const response = await removeImage(params);

    if (response?.Err === "InvalidAccess") {
      window.alert("다시 로그인 해주세요.");

      deleteCookie("userId");
      deleteCookie("authToken");
      router.reload();
      return;
    }

    const newGrallery = gallery.map((image, index) => {
      if (index === imageIndex) {
        return null;
      }
      return image;
    });

    setGallery(newGrallery);
  }

  async function requestAddImage(
    event: React.ChangeEvent<HTMLInputElement>,
    imageIndex?: number
  ) {
    if (!userId || !authToken || authToken === "undefined") {
      window.alert("로그인 후 이용가능 합니다!");
      return;
    }
    if (!profileGame || !selectedProfileGame) {
      window.alert("카드 등록을 먼저 해주세요!");
      return;
    }

    const imageFile = event.target.files?.item(0);
    const reader = new window.FileReader();

    if (imageFile) {
      reader.readAsArrayBuffer(imageFile);
      reader.onloadend = async () => {
        if (reader.result && typeof reader.result !== "string") {
          const imageBase64 = new Buffer(reader.result).toString("base64");

          const params: IImageInput = {
            id: userId,
            authToken,
            gameName: selectedProfileGame,
            imageIndex: imageIndex !== undefined ? imageIndex : _gallery.length,
            imageString: imageBase64,
          };

          const response: IImageResponse = await addImage(params);

          if (response?.Err?.code === "ConditionalCheckFailedException") {
            window.alert("다시 로그인 해주세요.");

            deleteCookie("userId");
            deleteCookie("authToken");
            router.reload();
            return;
          }

          if (response?.Err?.code === "InvalidAccess") {
            window.alert("다시 로그인 해주세요.");

            deleteCookie("userId");
            deleteCookie("authToken");
            router.reload();
            return;
          }

          if (response.games?.lostark) {
            const newImage = response.games.lostark.gallery[0];
            if (imageIndex === undefined) {
              setGallery([...gallery, newImage]);
            } else {
              const newGrallery = gallery.map((image, index) => {
                if (index === imageIndex) {
                  return newImage;
                }
                return image;
              });

              setGallery(newGrallery);
            }
          } else {
            const newImage = response.games.maplestory.gallery[0];
            if (imageIndex === undefined) {
              setGallery([...gallery, newImage]);
            } else {
              const newGrallery = gallery.map((image, index) => {
                if (index === imageIndex) {
                  return newImage;
                }
                return image;
              });

              setGallery(newGrallery);
            }
          }

          const newUserProfile: IProfile = await getProfileById({
            id: userId,
          });

          setUserProfile(newUserProfile);
        }
      };
    }
  }

  function resetState() {
    setEyesColor("");
    setHairColor("");
  }

  function toggleModal() {
    if (!profileGame || !selectedProfileGame) {
      window.alert("캐릭터를 등록해주세요");
      return;
    }
    setOpenModal(!openModal);
    resetState();
  }

  function toggleGeneratedModal() {
    if (!profileGame || !selectedProfileGame) {
      window.alert("캐릭터를 등록해주세요");
      return;
    }
    setGeneratedOpenModal(!openGeneratedModal);
    resetState();
  }

  function handleAiGender(event: React.ChangeEvent<HTMLInputElement>) {
    setAiGender(event.target.value);
    setSelectedCloth("");

    if (event.target.value === "boy") {
      setCloths(maleCloths);
    } else {
      setCloths(femaleCloths);
    }
  }

  function handleHairColor(color: { label: string; value: string }) {
    setHairColor(color.label);
  }

  function handleEyesColor(color: { label: string; value: string }) {
    setEyesColor(color.label);
  }

  // function handleCloth(cloth: string) {
  //   setSelectedCloth(cloth);
  // }

  async function requestCreateAiImage() {
    if (!authToken || !userId) {
      window.alert("로그인 후 이용해 주세요");
      return;
    }

    if (!profileGame?.name) {
      window.alert("캐릭터 등록이 필요해요");
      return;
    }

    if (wait === -1) {
      window.alert("서버에서 그림을 만들고 있어요. 조금만 기다려 주세요.");
      return;
    }

    if (typeof wait === "number") {
      window.alert(`${wait}초 후에 시도해주세요`);
      return;
    }

    const _hairColor = colorOptions.filter(
      (menu) => menu.label === hairColor
    )[0];

    const _eyesColor = colorOptions.filter(
      (menu) => menu.label === eyesColor
    )[0];

    const params: IAiImageInput = {
      id: userId,
      gameName: selectedProfileGame,
      gender: aiGender,
      hairColor: _hairColor?.value,
      eyesColor: _eyesColor?.value,
      token: authToken,
    };

    setLoading(true);

    const response: IAiImageResponse = await createAiImage(params);
    // console.log(response);

    if (response) {
      setLoading(false);
    }

    if (response?.Err === "InvalidAccess") {
      window.alert("다시 로그인 해주세요.");

      deleteCookie("userId");
      deleteCookie("authToken");
      router.reload();
      return;
    }

    if (response?.Err === "DailyLimit") {
      window.alert(
        "오늘의 무료 이미지 생성 횟수가 모두 소진되었습니다. 아래 어플에서 더 많은 기능을 사용해볼 수 있습니다!"
      );
      return;
    }

    if (response?.Err === "Busy") {
      window.alert("잠시 후 시도해주세요!");
      return;
    }
    setWait(response.wait);
    toggleModal();
  }

  async function deleteGeneratedImage() {
    if (!userId || !authToken) return;

    const removeUrlParams: IRemoveImageUrlInput = {
      id: userId,
      gameName: selectedProfileGame,
      authToken,
    };

    await removeAiImageUrl(removeUrlParams);
    setGenImageUrl("");
    toggleGeneratedModal();
    setWait(null);
  }

  async function saveGeneratedImage() {
    if (!authToken || !userId) {
      window.alert("로그인 후 이용해 주세요");
      return;
    }

    const imageIndex =
      gallery.indexOf(null) === -1 ? gallery.length : gallery.indexOf(null);

    const imageParams: IImageUrlInput = {
      id: userId,
      gameName: selectedProfileGame,
      authToken,
      imageIndex,
      imageUrl: genImageUrl,
    };

    const responseImageUrl = await addImageWithUrl(imageParams);

    if (responseImageUrl?.Err?.code === "InvalidAccess") {
      window.alert("다시 로그인 해주세요.");

      deleteCookie("userId");
      deleteCookie("authToken");
      router.reload();
      return;
    }

    if (responseImageUrl?.games) {
      const newGralleryImage =
        responseImageUrl.games[`${selectedProfileGame}`].gallery[0];

      gallery[imageIndex] = newGralleryImage;
      setGallery(gallery);
    } else {
      const newUserProfile: IProfile = await getProfileById({
        id: userId,
      });

      setUserProfile(newUserProfile);
    }

    const removeUrlParams: IRemoveImageUrlInput = {
      id: userId,
      gameName: selectedProfileGame,
      authToken,
    };

    await removeAiImageUrl(removeUrlParams);
    setGenImageUrl("");
    toggleGeneratedModal();
    setWait(null);

    const tempTickets = tickets - 1;
    localStorage.setItem("tickets", tempTickets.toString());

    setTickets((prev) => {
      return prev--;
    });
  }

  async function requestGetAiImageUrl() {
    if (!userId || !authToken) return;

    const params: IGetAiImageUrl = {
      id: userId,
      gameName: selectedProfileGame,
      authToken,
    };

    const response = await getAiImageUrl(params);
    if (response.message) window.alert(response.message);

    if (response.wait === -1) {
      window.alert("서버에서 그림을 만들고 있어요. 조금만 기다려 주세요.");
      return;
    }
    if (typeof response.wait === "number") {
      window.alert(`${wait}초 후에 시도해주세요`);
      return;
    }

    if (response.url != null) {
      setGenImageUrl(response.url);
      toggleGeneratedModal();
    }

    if (response?.Err === "이미지 생성을 해주세요") {
      window.alert("이미지를 먼저 생성해 주세요.");
      return;
    }
  }

  function handleProfileGame(game: ServicedGames) {
    setSelectedProfileGame(game);
  }

  async function handleDynamicUrl() {
    const url = `https://i.gamecard.gg/${profileGame.gameName}?id=${userProfile.id}`;

    try {
      await navigator.clipboard.writeText(url);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  }

  async function addGameCharacter(
    profile: IProfile,
    seletedGame: string,
    gameUserName: string,
    token: string
  ) {
    if (!userId || !token) return;
    const response = await requestAddGame({
      id: profile.id,
      gameName: seletedGame,
      gameUser: gameUserName,
      authToken: token,
    });

    if (response?.Err === "InvalidAccess") {
      window.alert("다시 로그인 해주세요.");

      deleteCookie("userId");
      deleteCookie("authToken");
      router.reload();
      return;
    }

    const newUserProfile: IProfile = await getProfileById({
      id: userId,
    });

    setUserProfile(newUserProfile);

    return response;
  }
};

export default ProfileContainer;
