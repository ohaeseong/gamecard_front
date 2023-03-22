import React from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import ContentsLayout from "@/layouts/ContentsLayout";
import Image from "next/image";
import { requestAddGame } from "@/apis/game";
import { getProfileById } from "@/apis/profile";
import { deleteCookie } from "@/hooks/cookie";
import { IProfile } from "@/types/Account";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import GameCard from "@/components/GameCard";
import { ILostArk, IMapleStory } from "@/types/Game";
import Link from "next/link";
import CardEditTimeLine from "@/components/CardEditTimeLine";

type Props = {
  userProfile: IProfile;
  userId: string;
  authToken: string;
};

const CardEditContainer: React.FC<Props> = ({
  userProfile: profile,
  authToken,
  userId,
}: Props) => {
  const cardEditTimelines = ["내 계정 확인", "내 정보 등록", "카드 확인"];
  const router = useRouter();

  const [selectedGame, setSelectedGame] = React.useState("");
  const [character, setCharacter] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [currentEditTimeLine, setCurrentEditTimeLine] = React.useState(
    cardEditTimelines[1]
  );

  const [cardInfo, setCardInfo] = React.useState<
    IMapleStory | ILostArk | null
  >();

  return (
    <DefaultLayout profile={profile}>
      <ContentsLayout className="py-4">
        <div className="flex flex-col mt-4">
          <h1 className="text-indigo-400 text-xl mb-2 font-bold">게임 선택</h1>
          <div className="bg-zinc-800 rounded h-40 flex flex-row justify-around items-center">
            <div className="h-fit flex flex-row items-center space-x-3">
              <Image
                src="/images/symbols/maplestory_icon.jpg"
                width={48}
                height={48}
                alt="maple_icon"
              />
              <span className="text-indigo-400 font-semibold">
                메이플 스토리
              </span>
              <input
                className="focus:outline-none"
                type="radio"
                value="maplestory"
                onChange={handleSelectedGame}
                checked={selectedGame === "maplestory"}
              />
            </div>
            <div className="h-fit flex flex-row items-center space-x-3">
              <Image
                className="rounded"
                src="/images/symbols/lostark_icon.jpg"
                width={48}
                height={48}
                alt="maple_icon"
              />
              <span className="text-indigo-400 font-semibold">로스트 아크</span>
              <input
                className="focus:outline-none"
                type="radio"
                value="lostark"
                onChange={handleSelectedGame}
                checked={selectedGame === "lostark"}
              />
            </div>
          </div>

          {/* {selectedGame && !cardInfo && (
            <div className="mt-8">
              <h1 className="text-indigo-400 text-xl mb-2 font-bold">
                캐릭터 검색
              </h1>
              <div className="w-full h-64 rounded flex flex-row justify-center items-center bg-zinc-800">
                <input
                  className="h-fit px-2 focus:outline-none py-1.5 w-fit mr-2 text-white rounded text-lg bg-zinc-700 border-b-0"
                  placeholder="캐릭터 이름 검색"
                  value={character}
                  onChange={(event) => setCharacter(event.target.value)}
                />
                <button
                  className="bg-indigo-500 w-fit rounedd px-3 py-1.5 rounded text-white"
                  onClick={requestAddGameCharacter}
                >
                  등록
                </button>
              </div>
            </div>
          )} */}

          {loading && (
            <div className="w-full justify-center items-center flex mt-20">
              <h1 className="text-zinc-400 font-bold text-2xl">Loading...</h1>
            </div>
          )}

          {/* {cardInfo && ( */}
          <div className="mt-4 flex flex-row justify-around items-center">
            <div className="flex flex-col items-center bg-zinc-800 w-full mr-4 rounded h-full">
              <div className="w-full h-12 bg-zinc-900 bg-opacity-70 rounded-t">
                <CardEditTimeLine
                  timelines={cardEditTimelines}
                  currentTimeLine={currentEditTimeLine}
                />
              </div>

              <div className="w-full h-full p-8">
                <h1 className="text-xl text-indigo-400 font-bold pb-4 border-b border-zinc-700">
                  내 소개
                </h1>
                <div className="text-sm font-bold text-white mt-4">
                  내 기본 정보
                </div>
                <span className="text-zinc-400 text-sm mt-6 font-bold inline-block">
                  내 나이
                </span>
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-row">
                    <input
                      className="bg-zinc-600"
                      type="radio"
                      // onChange={handleAiGender}
                      value=""
                      // checked={aiGender === "girl"}
                    />
                    <span className="text-white text-xs ml-2">미성년</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-zinc-800 px-10 min-h-[580px] rounded">
              <span className="text-lg mb-8 mt-8 pb-5 text-white my-1 border-b border-zinc-700 w-full text-center">
                미리보기
              </span>
              {/* <GameCard
                  size="min-w-[300px] h-[420px]"
                  type={selectedGame}
                  data={cardInfo}
                /> */}
              <div className="min-w-[300px] h-[420px]"></div>
            </div>
            {/* <h1 className="text-2xl text-white font-bold">등록 완료!</h1>
                <Link href={`/profile/${userId}`}>
                  <span className="text-lg font-bold mt-3 inline-block text-indigo-400">
                    프로필 페이지로 이동하기
                  </span>
                </Link> */}
          </div>
          {/* )} */}
        </div>
      </ContentsLayout>
    </DefaultLayout>
  );

  function handleSelectedGame(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedGame(event.target.value);
    setCardInfo(null);
  }

  async function requestAddGameCharacter() {
    if (!authToken) {
      window.alert("로그인 후 다시 시도 해주세요");
      return;
    }

    if (!character || !selectedGame) {
      window.alert("양식을 지켜주세요");
      return;
    }

    setLoading(true);

    const response = await requestAddGame({
      id: userId,
      gameName: selectedGame,
      gameUser: character,
      authToken,
    });

    if (response) {
      setLoading(false);
      if (response?.Err === "24시간 이내에 다시 등록할 수 없습니다") {
        window.alert("24시간 이내에 다시 등록할 수 없습니다");
        return;
      }

      if (response?.Err === "ErrError: InvalidUserName") {
        window.alert("캐릭터를 찾지 못했습니다.");
        return;
      }

      setCardInfo(response);
      setCurrentEditTimeLine(cardEditTimelines[1]);
    }
  }
};

export default CardEditContainer;
