/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  addImage,
  createAiImage,
  IAiImageInput,
  IImageDelete,
  IImageInput,
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
  authToken?: string;
};
const ProfileContainer = ({ userProfile, authToken, userId }: Props) => {
  const games = getGameAbilityFromProfile<IListItem>(userProfile.games);
  const femaleCloths = Object.keys(femaleClothMap);
  const maleCloths = Object.keys(maleClothMap);

  const [mapleInfo, setMapleInfo] =
    React.useState<Nullable<IMapleInfoResponse>>();

  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [aiNewImage, setAiNewImage] = React.useState("");

  const [aiGender, setAiGender] = React.useState("boy");
  const [eyesColor, setEyesColor] = React.useState("black");
  const [hairColor, setHairColor] = React.useState("black");
  const [cloths, setCloths] = React.useState(maleCloths);
  const [selectedCloth, setSelectedCloth] = React.useState("");

  const [selectedProfileGame, setSelectedProfileGame] = React.useState(
    games[0].gameName
  );

  const profileGame = games.filter(
    (game) => game.gameName === selectedProfileGame
  )[0];

  const _gallery = games.filter(
    (game) => game.gameName === selectedProfileGame
  )[0]?.gallery;

  const [gallery, setGallery] = React.useState<Array<string>>(_gallery);

  React.useEffect(() => {
    const _gallery = games.filter(
      (game) => game.gameName === selectedProfileGame
    )[0]?.gallery;

    setGallery(_gallery);
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
          <span className="text-xl font-bold text-indigo-600">Gallery</span>
          <div
            className="border border-indigo-600 text-sm px-3 py-2 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer bg-indigo-600 text-white rounded"
            onClick={toggleModal}
          >
            자짤 만들기!
          </div>
        </div>
        <ImageList
          className="mt-4"
          images={gallery}
          uploadImage={AddImage}
          deleteImage={deleteImage}
        />

        <Modal
          className="w-[750px]"
          title="AI 이미지 생성 옵션"
          isOpen={openModal}
          closeModal={toggleModal}
        >
          <>
            {/* {!mapleInfo && (
              <div className="h-40 flex items-center justify-center flex-col">
                <div className="flex flex-row">
                  <span className="text-indigo-600">메이플 닉네임:</span>
                  <input
                    className="focus:outline-none border rounded ml-2 pl-1 text-sm w-40"
                    onChange={handleName}
                    value={name}
                  />
                  <button
                    className="bg-indigo-600 text-white px-2 rounded ml-2 text-sm"
                    onClick={requestGetMapleInfo}
                  >
                    검색
                  </button>
                </div>
                {loading && (
                  <span className="text-xl mt-8 text-slate-400">
                    Loading...
                  </span>
                )}
              </div>
            )} */}
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
                    <label>Boy</label>
                    <input
                      type="radio"
                      onChange={handleAiGender}
                      value="boy"
                      checked={aiGender === "boy"}
                    />
                    <label>Girl</label>
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
                  {!aiNewImage ? (
                    <button
                      className="p-2 py-2 bg-indigo-500 mt-14 text-sm text-white w-full rounded"
                      onClick={requestCreateAiImage}
                    >
                      {loading ? "Loading..." : "이미지 생성"}
                    </button>
                  ) : (
                    <span className="text-sm text-slate-500 mt-8">
                      {/* 일일 통합 생성 가능 횟수 (00시 초기화) : {limit} */}
                    </span>
                  )}
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

    const response = await removeImage(params);
  }

  async function AddImage(event: React.ChangeEvent<HTMLInputElement>) {
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
            imageIndex: _gallery.length,
            imageString: imageBase64,
          };

          const response: IImageResponse = await addImage(params);

          if (response?.Err?.code === "ConditionalCheckFailedException") {
            window.alert("다시 로그인 후 사용해 주세요!");
            return;
          }

          if (response.games?.lostark) {
            setGallery([...gallery, response.games.lostark.gallery[0]]);
          } else {
            setGallery([...gallery, response.games.maplestory.gallery[0]]);
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
    if (!profileGame) {
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
    if (!profileGame?.name || !aiGender) {
      window.alert("이미지 생성을 위한 정보를 적어 주세요!");
      return;
    }

    const params: IAiImageInput = {
      gameUser: profileGame?.name,
      gender: aiGender,
      hairColor,
      eyeColor: eyesColor,
      cloth: selectedCloth,
    };

    setLoading(true);
    const response: IAiImageResponse = await createAiImage(params);

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
    console.log(response.newImage);

    setAiNewImage(response.newImage);
  }

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleProfileGame(game: ServicedGames) {
    setSelectedProfileGame(game);
  }
};

export default ProfileContainer;

// import Button from "@/components/Button";
// import React from "react";
// import List, { IListItem } from "@/components/List";
// import { BsArrowRightShort } from "react-icons/bs";
// import { FiEdit } from "react-icons/fi";
// import Modal from "@/components/Modal";
// import { CategoryItem } from "@/types/Category";
// import CategorySelector from "@/components/CategorySelector";
// import { IProfile } from "@/types/Account";
// import ProfileCard from "@/components/ProfileCard";
// import classNames from "classnames";

// import Input from "@/components/Input";
// import { requestAddTmi, requestUpdateTmi } from "@/apis/tmi";
// import { requestAddGame } from "@/apis/game";
// import { getGameAbilityFromProfile } from "@/utils/game";
// import { useRouter } from "next/router";

// type Props = {
//   gameTypes: Array<CategoryItem>;
//   tmiTypes: Array<CategoryItem>;
//   profile: IProfile;
//   userId?: string;
//   token?: string;
// };

// const ProfileContainer: React.FC<Props> = ({
//   gameTypes,
//   tmiTypes,
//   profile,
//   userId,
//   token,
// }) => {
//   const router = useRouter();

//   const [openGameBox, setOpenGameBox] = React.useState(false);
//   const [, setOpenTmiBox] = React.useState(false);
//   const [openModal, setOpenModal] = React.useState(false);

//   const [essential, setEssential] = React.useState("");

//   const [showForm, setShowForm] = React.useState(false);
//   const [selectedCategory, setSelectedCategory] = React.useState("");

//   const [tmis, setTmis] = React.useState(profile.tmi);

//   const userGames = getGameAbilityFromProfile<IListItem>(profile.games);

//   const [games] = React.useState(userGames);

//   const [tmiUpdateIndex, setTmiUpdateIndex] = React.useState(-1);
//   return (
//     <div className="w-full h-full p-4 flex flex-col">
//       <div className="space-x-4">
//         <ProfileCard profile={profile} />
//       </div>

//       <div className="h-10 border mt-6 flex items-center justify-around p-2 space-x-2 font-semibold">
//         <span className="text-sky-600 cursor-pointer">Facebook</span>
//         <span className="text-sky-400 cursor-pointer">Twitter</span>
//         <span className="text-indigo-500 cursor-pointer" onClick={copyUrl}>
//           Copy URL
//         </span>
//       </div>

//       <div className="space-y-4 mt-6">
//         <div>
//           <List title="Games" items={games} />
//           <Button
//             className={classNames("mt-2", {
//               hidden: profile.id !== userId || token === "undefined",
//             })}
//             onClick={onClickGameButton}
//           >
//             Game 추가하기!
//           </Button>
//         </div>
//         <div>
//           <div className="flex flex-col min-h-[10rem]">
//             <div className="text-lg font-semibold mb-3">T.M.I</div>
//             <div className="space-y-2">
//               {tmis.length === 0 && (
//                 <div className="w-full h-[10rem] border border-slate-200 rounded flex justify-center items-center">
//                   <span className="text-slate-500">
//                     아직 등록된 포스트가 없어요!
//                   </span>
//                 </div>
//               )}
//               {tmis.map((tmi, index) => (
//                 <div
//                   key={tmi.name + index}
//                   className="flex flex-row border-b cursor-pointer justify-between"
//                 >
//                   <div className="flex flex-row">
//                     <div className="w-6 h-6 mr-2 flex justify-center items-center border font-bold bg-indigo-500 text-white rounded">
//                       {tmi.name[0].toUpperCase()}
//                     </div>
//                     <span>{tmi.content}</span>
//                   </div>

//                   <FiEdit
//                     className={classNames("h-5 w-5 mr-1", {
//                       hidden: profile.id !== userId || token === "undefined",
//                     })}
//                     onClick={() => {
//                       setTmiUpdateIndex(index);
//                       onClickTmiButton();
//                       setEssential(tmi.content);
//                     }}
//                     color="gray"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <Button
//             className={classNames("mt-2", {
//               hidden: profile.id !== userId || token === "undefined",
//             })}
//             onClick={onClickTmiButton}
//           >
//             T.M.I 추가하기!
//           </Button>

//           {openGameBox ? (
//             <Modal title="Game Box" isOpen={openModal} closeModal={toggleModal}>
//               {!showForm ? (
//                 <CategorySelector
//                   categories={gameTypes}
//                   selected={selectedCategory}
//                   onClick={handleSelectedGame}
//                 />
//               ) : (
//                 <div className="h-[12rem] w-full flex flex-col items-center justify-center">
//                   <Input
//                     placeholder="게임 닉네임"
//                     onChange={handleEssentialForm}
//                     value={essential}
//                   />

//                   <Button className="w-32 mt-6" onClick={handleGame}>
//                     추가하기
//                   </Button>
//                 </div>
//               )}

//               <div className="w-full flex justify-end pr-1 mt-4">
//                 <BsArrowRightShort
//                   className={classNames(
//                     "hover:fill-indigo-500 transition-colors",
//                     {
//                       hidden: showForm,
//                     }
//                   )}
//                   cursor="pointer"
//                   color="gray"
//                   size={35}
//                   onClick={() => setShowForm(true)}
//                 />
//               </div>
//             </Modal>
//           ) : (
//             <Modal title="T.M.I" isOpen={openModal} closeModal={toggleModal}>
//               {!showForm ? (
//                 <CategorySelector
//                   categories={tmiTypes}
//                   selected={selectedCategory}
//                   onClick={handleSelectedGame}
//                 />
//               ) : (
//                 <div className="h-[12rem] w-full flex flex-col items-center justify-center">
//                   <Input
//                     className="w-96"
//                     placeholder="나의 T.M.I"
//                     onChange={handleEssentialForm}
//                     value={essential}
//                   />

//                   <Button className="w-96 mt-6" onClick={handleTMI}>
//                     {!tmiUpdateIndex ? "추가하기" : "수정하기"}
//                   </Button>
//                 </div>
//               )}

//               <div className="w-full flex justify-end pr-1 mt-4">
//                 <BsArrowRightShort
//                   className={classNames(
//                     "hover:fill-indigo-500 transition-colors",
//                     {
//                       hidden: showForm,
//                     }
//                   )}
//                   cursor="pointer"
//                   color="gray"
//                   size={35}
//                   onClick={() => setShowForm(true)}
//                 />
//               </div>
//             </Modal>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   function handleEssentialForm(e: React.ChangeEvent<HTMLInputElement>) {
//     setEssential(e.target.value);
//   }

//   function onClickGameButton() {
//     setOpenTmiBox(false);
//     setOpenGameBox(true);
//     setShowForm(false);
//     toggleModal();
//   }

//   function onClickTmiButton() {
//     setOpenTmiBox(true);
//     setOpenGameBox(false);
//     setShowForm(false);
//     toggleModal();
//   }

//   function toggleModal() {
//     setSelectedCategory("");
//     setEssential("");
//     setOpenModal(!openModal);
//   }

//   function handleSelectedGame(game: string) {
//     setSelectedCategory(game);
//   }

//   async function handleTMI() {
//     if (!token) {
//       window.alert("로그인 후 다시시도 해주세요!");
//       return;
//     }

//     if (!essential || !selectedCategory) {
//       window.alert("양식을 지켜주세요!");
//       return;
//     }

//     if (tmiUpdateIndex === -1) {
//       const response = await requestAddTmi({
//         id: profile.id,
//         tmiName: selectedCategory,
//         tmiContent: essential,
//         authToken: token,
//       });
//       setTmis(response.tmi || []);
//     } else {
//       const response = await requestUpdateTmi({
//         id: profile.id,
//         tmiName: selectedCategory,
//         tmiContent: essential,
//         authToken: token,
//         tmiIndex: tmiUpdateIndex,
//       });

//       setTmis((tmis) => {
//         tmis[tmiUpdateIndex] = response.tmi[0];

//         return tmis;
//       });
//       setTmiUpdateIndex(-1);
//     }
//     toggleModal();
//   }

//   async function handleGame() {
//     if (!token) {
//       window.alert("로그인 후 다시시도 해주세요!");
//       return;
//     }

//     if (!essential || !selectedCategory) {
//       window.alert("양식을 지켜주세요!");
//       return;
//     }

//     const response = await requestAddGame({
//       id: profile.id,
//       gameName: selectedCategory,
//       gameUser: essential,
//       authToken: token,
//     });
//     console.log(response);

//     toggleModal();
//   }

//   function copyUrl() {
//     if (typeof window !== "undefined") {
//       const hostname = window.location.hostname;
//       navigator.clipboard.writeText(`http://${hostname}${router.asPath}`);

//       window.alert("카피 완료!");
//     }
//   }
// };

// export default ProfileContainer;
