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
import { getMapleInfo } from "@/apis/game";
import { Nullable } from "@/utils/utileTypes";

const colorOptions = [
  "black",
  "white",
  "red",
  "blue",
  "yellow",
  "green",
  "pink",
  "orange",
  "violet",
  "brown",
  "gray",
  "purple",
  "blonde",
];

type Props = {
  userProfile: IProfile;
  userId?: string;
  loginedUserId?: string;
  authToken?: string;
};
const ProfileContainer = ({
  userProfile,
  authToken,
  userId,
  loginedUserId,
}: Props) => {
  const games = getGameAbilityFromProfile<IListItem>(userProfile.games);
  const femaleCloths = Object.keys(femaleClothMap);
  const maleCloths = Object.keys(maleClothMap);

  const [mapleInfo, setMapleInfo] =
    React.useState<Nullable<IMapleInfoResponse>>();

  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  // const [aiNewImage, setAiNewImage] = React.useState("");

  const [aiGender, setAiGender] = React.useState("boy");
  const [eyesColor, setEyesColor] = React.useState("black");
  const [hairColor, setHairColor] = React.useState("black");
  const [cloths, setCloths] = React.useState(maleCloths);
  const [selectedCloth, setSelectedCloth] = React.useState("");

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

  return (
    <DefaultLayout profile={userProfile}>
      <ContentsLayout>
        <ProfileCard
          games={games}
          token={authToken}
          profile={userProfile}
          selectedProfileGame={selectedProfileGame}
          handleProfileGame={handleProfileGame}
        />
        <div className="w-full mt-8 flex flex-row justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            Gallery - {gallery.length}/21
          </span>
          {loginedUserId === userProfile?.id && (
            <div className="flex space-x-2">
              <div
                className="border border-indigo-600 text-sm px-3 py-2 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer bg-indigo-600 text-white rounded"
                onClick={toggleModal}
              >
                자짤 만들기!
              </div>
              <div
                className="border border-indigo-600 text-sm px-3 py-2 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer bg-indigo-600 text-white rounded"
                onClick={requestGetAiImageUrl}
              >
                자짤 받기!
              </div>
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
          title="AI 이미지 생성 옵션"
          isOpen={openModal}
          closeModal={toggleModal}
        >
          <>
            {selectedProfileGame && (
              <div className="flex flex-row justify-between">
                <div className="w-56 relative flex flex-col items-center">
                  <img
                    className="object-contain w-56 h-56"
                    src={profileGame.imageUrl}
                    alt="maple_profile_image"
                  />
                  <span className="absolute top-2">{`${profileGame.name} - ${profileGame.job}`}</span>
                  <span className="absolute bottom-0">{`World - ${profileGame.world}`}</span>
                </div>
                <div className="py-2 ml-4 flex flex-col items-center">
                  <div className="flex flex-row justify-center items-center space-x-2">
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
                    <div className="flex flex-row space-x-2 justify-center items-center">
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
                    <span className="text-xs text-slate-500">
                      - 원본 캐릭터와 다른 색상을 선택하면 정확도와 인식률이
                      대폭 하락합니다.
                    </span>
                    <div className="mt-4">
                      <span className="text-sm">의상 선택 : </span>
                      <DropdownMenu
                        menus={cloths}
                        selected={selectedCloth}
                        onClick={handleCloth}
                      />
                    </div>
                  </div>

                  <button
                    className="p-2 py-2 bg-indigo-500 mt-14 text-sm text-white w-full rounded"
                    onClick={requestCreateAiImage}
                  >
                    {loading ? "Loading..." : "이미지 생성"}
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
      window.alert("로그인 후 이용가능 합니다!");
      return;
    }

    const params: IImageDelete = {
      id: userId,
      authToken,
      gameName: selectedProfileGame,
      imageIndex,
    };

    await removeImage(params);

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
      await window.alert("로그인 후 이용가능 합니다!");
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
            window.alert("다시 로그인 후 사용해 주세요! ㅠ.ㅠ");
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
        }
      };
    }
  }

  function resetState() {
    setEyesColor("");
    setHairColor("");
    setMapleInfo(null);
  }

  function toggleModal() {
    if (!profileGame || !selectedProfileGame) {
      window.alert("게임 캐릭터를 먼저 등록해주세요!");
      return;
    }
    setOpenModal(!openModal);
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

  function handleHairColor(color: string) {
    setHairColor(color);
  }

  function handleEyesColor(color: string) {
    setEyesColor(color);
  }

  function handleCloth(cloth: string) {
    setSelectedCloth(cloth);
  }

  async function requestCreateAiImage() {
    if (!authToken || !userId) {
      window.alert("로그인 후 이용해 주세요!");
      return;
    }

    if (!profileGame?.name) {
      window.alert("캐릭터 등록이 필요해요!");
      return;
    }

    if (typeof wait === "number") {
      window.alert("서버에서 그림을 만들고 있어요! 조금만 기다려 주세요!");
      return;
    }

    const params: IAiImageInput = {
      id: userId,
      // gameUser: profileGame?.name,
      gameName: selectedProfileGame,
      gender: aiGender,
      hairColor,
      eyesColor,
      // cloth: selectedCloth,
      token: authToken,
    };

    setLoading(true);

    const response: IAiImageResponse = await createAiImage(params);
    console.log(response);

    if (response) {
      setLoading(false);
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

  async function requestGetAiImageUrl() {
    if (!userId || !authToken) return;

    const params: IGetAiImageUrl = {
      id: userId,
      gameName: selectedProfileGame,
      authToken,
    };

    const response = await getAiImageUrl(params);

    const imageParams: IImageUrlInput = {
      id: userId,
      gameName: selectedProfileGame,
      authToken,
      imageIndex: gallery.indexOf(null),
      imageUrl: response.url,
    };

    const responseImageUrl = await addImageWithUrl(imageParams);

    if (responseImageUrl?.games) {
      const newGrallery = gallery.map((image, index) => {
        if (index === gallery.indexOf(null)) {
          return selectedProfileGame === "maplestory"
            ? responseImageUrl.games.maplestory.gallery[0]
            : responseImageUrl.games.lostark.gallery[0];
        }
        return image;
      });

      setGallery(newGrallery);

      const removeUrlParams: IRemoveImageUrlInput = {
        id: userId,
        gameName: selectedProfileGame,
        authToken,
      };

      await removeAiImageUrl(removeUrlParams);
      setWait(null);
    }
  }

  function handleProfileGame(game: ServicedGames) {
    setSelectedProfileGame(game);
  }
};

export default ProfileContainer;
