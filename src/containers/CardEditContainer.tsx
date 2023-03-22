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
  const router = useRouter();

  const [selectedGame, setSelectedGame] = React.useState("");
  const [character, setCharacter] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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

          {selectedGame && (
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
          )}

          {loading && (
            <div className="w-full justify-center items-center flex mt-20">
              <h1 className="text-zinc-400 font-bold text-2xl">Loading...</h1>
            </div>
          )}

          {cardInfo && (
            <div className="mt-8 flex flex-row justify-around items-center">
              <GameCard type={selectedGame} data={cardInfo} />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl text-white font-bold">등록 완료!</h1>
                <Link href={`/profile/${userId}`}>
                  <span className="text-lg font-bold mt-3 inline-block text-indigo-400">
                    프로필 페이지로 이동하기
                  </span>
                </Link>
              </div>
            </div>
          )}
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
    }
  }
};

export default CardEditContainer;
