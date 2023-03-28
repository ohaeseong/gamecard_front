import React from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import ContentsLayout from "@/layouts/ContentsLayout";
import Image from "next/image";
import {
  requestAddGame,
  requestAddGameWithImage,
  requestAddProfileInfo,
} from "@/apis/game";
import { IProfile } from "@/types/Account";
import { useRouter } from "next/router";
import {
  ILostArk,
  IMapleStory,
  MapleCards,
  ProfileAge,
  ProfileFriendType,
  ProfileGender,
  ProfileLang,
  ProfilePlayTime,
  ProfilePlayType,
  ProfileVoice,
  ServicedGames,
} from "@/types/Game";
import CardEditTimeLine from "@/components/CardEditTimeLine";
import Button from "@/components/Button";
import {
  getAgeLabel,
  getFriendTypeLabel,
  getGenderLabel,
  getPlayTimeLabel,
  getPlayTypeLabel,
} from "@/utils/profile";
import GameCard from "@/components/GameCard";

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
  const cardEditTimelines = ["캐릭터 등록", "내 정보 등록", "카드 등록"];
  const router = useRouter();

  const [selectedGame, setSelectedGame] = React.useState("");
  const [character, setCharacter] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [currentEditTimeLine, setCurrentEditTimeLine] = React.useState(
    cardEditTimelines[0]
  );

  const [cardInfo, setCardInfo] = React.useState<
    IMapleStory | ILostArk | null
  >();

  const [age, setAge] = React.useState<number>();
  const [gender, setGender] = React.useState<number>();
  const [voice, setVoice] = React.useState<number>();
  const [bg, setBg] = React.useState<number>();
  const [playTime, setPlayTime] = React.useState<number[]>([]);
  const [playType, setPlayType] = React.useState<number[]>([]);
  const [friendType, setFriendType] = React.useState<number[]>([]);

  const [intro, setIntro] = React.useState("");

  return (
    <DefaultLayout profile={profile}>
      <ContentsLayout className="py-4">
        <div className="flex flex-col mt-4">
          <h1 className="text-indigo-400 text-xl mb-2 font-bold">
            {!selectedGame ? "게임 선택" : "카드 등록"}
          </h1>
          {!selectedGame && (
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
                  value={ServicedGames.MapleStory}
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
                  alt="lostark_icon"
                />
                <span className="text-indigo-400 font-semibold">
                  로스트 아크
                </span>
                <input
                  className="focus:outline-none"
                  type="radio"
                  value={ServicedGames.LostArk}
                  onChange={handleSelectedGame}
                  checked={selectedGame === "lostark"}
                />
              </div>

              {/* <div className="h-fit flex flex-row items-center space-x-3">
                <Image
                  className="rounded"
                  src="/images/symbols/valorant_icon.png"
                  width={48}
                  height={48}
                  alt="valorant_icon"
                />
                <span className="text-indigo-400 font-semibold">발로란트</span>
                <input
                  className="focus:outline-none"
                  type="radio"
                  value={ServicedGames.VALORANT}
                  onChange={handleSelectedGame}
                  checked={selectedGame === "valorant"}
                />
              </div>

              <div className="h-fit flex flex-row items-center space-x-3">
                <Image
                  className="rounded"
                  src="/images/symbols/lol_icon.png"
                  width={48}
                  height={48}
                  alt="lol_icon"
                />
                <span className="text-indigo-400 font-semibold">
                  리그 오브 레전드
                </span>
                <input
                  className="focus:outline-none"
                  type="radio"
                  value={ServicedGames.LOL}
                  onChange={handleSelectedGame}
                  checked={selectedGame === "lol"}
                />
              </div> */}
            </div>
          )}

          {selectedGame && (
            <div className="mt-4 flex flex-row justify-around items-center">
              <div className="flex flex-col items-center bg-zinc-800 w-full mr-2 rounded h-full">
                <div className="w-full h-12 bg-zinc-900 bg-opacity-70 rounded-t">
                  <CardEditTimeLine
                    timelines={cardEditTimelines}
                    currentTimeLine={currentEditTimeLine}
                  />
                </div>

                {cardEditTimelines[0] === currentEditTimeLine && (
                  <div className="w-full h-full py-8 px-4">
                    <h1 className="text-xl text-indigo-400 font-bold pb-4 border-b border-zinc-700">
                      캐릭터 등록
                    </h1>
                    <div className="mt-4 w-full h-[410px] flex items-center justify-between flex-col pb-6">
                      <div className="text-lg font-bold text-white mt-28 flex flex-col justify-center items-center">
                        <span>
                          아래에서{" "}
                          {selectedGame === "maplestory" ||
                          selectedGame === "lostark"
                            ? "캐릭터"
                            : selectedGame === "valorant"
                            ? "닉네임#태그와 함께"
                            : "소환사 닉네임 검색"}{" "}
                          검색
                        </span>
                        {/* {(selectedGame === "maplestory" ||
                          selectedGame === "lostark") && (
                          <span className="text-xs text-zinc-400 inline-block mt-1 mb-4">
                            *한번 캐릭터를 등록하게 되면 24이내로 다시 등록할 수
                            없습니다.
                          </span>
                        )} */}
                        <div className="mt-2">
                          <input
                            className="h-fit px-2 focus:outline-none py-1.5 w-fit mr-2 text-white rounded font-normal bg-zinc-700 border-b-0"
                            placeholder={
                              selectedGame === "maplestory" ||
                              selectedGame === "lostark"
                                ? "캐릭터 이름 검색"
                                : selectedGame === "valorant"
                                ? "닉네임#태그와 함께 검색"
                                : "소환사 닉네임 검색"
                            }
                            value={character}
                            onChange={(event) =>
                              setCharacter(event.target.value)
                            }
                          />
                          <Button
                            className="px-3 py-[0.3rem] w-fit font-normal"
                            onClick={
                              selectedGame === "maplestory" ||
                              selectedGame === "lostark"
                                ? requestAddGameCharacterWithImage
                                : requestAddGameCharacter
                            }
                          >
                            등록
                          </Button>
                        </div>
                      </div>
                      <div className="space-x-2 w-[400px] flex justify-center">
                        <Button
                          className="px-4 py-2"
                          disable={!cardInfo || !character}
                          onClick={onClickStepButton("next")}
                        >
                          {loading ? "Loading.." : "다음 단계"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {cardEditTimelines[1] === currentEditTimeLine && (
                  <div className="w-full h-full py-8 px-4 flex flex-col justify-between">
                    <h1 className="text-xl text-indigo-400 font-bold pb-4 border-b border-zinc-700">
                      내 소개
                    </h1>

                    <div className="font-bold text-white mt-4">
                      내 기본 정보
                    </div>

                    <div className="flex flex-row">
                      <div>
                        <div>
                          <span className="text-zinc-400 text-sm mt-6 font-bold inline-block">
                            내 나이
                          </span>
                          <div className="flex flex-row space-x-2">
                            <div className="flex flex-row mt-2 space-x-4">
                              {Object.values(ProfileAge).map(
                                (ageOption, index) => (
                                  <div
                                    key={ageOption}
                                    className="flex items-center"
                                  >
                                    <input
                                      className="bg-zinc-600"
                                      type="radio"
                                      onChange={() => setAge(index)}
                                      value=""
                                      checked={age === index}
                                    />
                                    <span className="text-white text-sm ml-2">
                                      {getAgeLabel(ageOption)}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-zinc-400 text-sm mt-6 font-bold inline-block">
                            성별
                          </span>
                          <div className="flex flex-row space-x-2">
                            <div className="flex flex-row mt-2 space-x-4">
                              {Object.values(ProfileGender).map(
                                (genderOption, index) => (
                                  <div
                                    key={genderOption}
                                    className="flex items-center"
                                  >
                                    <input
                                      className="bg-zinc-600"
                                      type="radio"
                                      onChange={() => setGender(index)}
                                      value=""
                                      checked={gender === index}
                                    />
                                    <span className="text-white text-sm ml-2">
                                      {getGenderLabel(genderOption)}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-zinc-400 text-sm mt-6 font-bold inline-block">
                            마이크 가능
                          </span>
                          <div className="flex flex-row space-x-2">
                            <div className="flex flex-row mt-2 space-x-4">
                              {Object.values(ProfileVoice).map(
                                (voiceOption, index) => (
                                  <div
                                    key={voiceOption}
                                    className="flex items-center"
                                  >
                                    <input
                                      className="bg-zinc-600"
                                      type="radio"
                                      onChange={() => setVoice(index)}
                                      checked={voice === index}
                                    />
                                    <span className="text-white text-sm ml-2">
                                      {voiceOption === "yes"
                                        ? "가능"
                                        : "불가능"}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-zinc-400 text-sm mt-6 font-bold inline-block">
                            활동 시간대
                          </span>
                          <div className="flex flex-row space-x-2">
                            <div className="flex flex-row mt-2 space-x-4">
                              {Object.values(ProfilePlayTime).map(
                                (playTimeOption, index) => (
                                  <div
                                    key={playTimeOption}
                                    className="flex items-center"
                                  >
                                    <input
                                      className="bg-zinc-600"
                                      type="checkbox"
                                      checked={playTime.includes(index)}
                                      readOnly
                                      onClick={() =>
                                        setPlayTime((prev) => {
                                          if (prev.includes(index)) {
                                            return prev.filter(
                                              (x) => x !== index
                                            );
                                          } else {
                                            return [...prev, index];
                                          }
                                        })
                                      }
                                    />
                                    <span className="text-white text-sm ml-2 min-w-fit">
                                      {getPlayTimeLabel(playTimeOption)}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div>
                          <span className="text-zinc-400 text-sm mt-6 font-bold inline-block">
                            내 플레이 스타일
                          </span>
                          <div className="flex flex-row space-x-2">
                            <div className="flex flex-row mt-2 space-x-4">
                              {Object.values(ProfilePlayType).map(
                                (playTypeOption, index) => (
                                  <div
                                    key={playTypeOption}
                                    className="flex items-center"
                                  >
                                    <input
                                      className="bg-zinc-600"
                                      type="checkbox"
                                      checked={playType.includes(index)}
                                      readOnly
                                      onChange={() =>
                                        setPlayType((prev) => {
                                          if (prev.includes(index)) {
                                            return prev.filter(
                                              (x) => x !== index
                                            );
                                          } else {
                                            return [...prev, index];
                                          }
                                        })
                                      }
                                    />
                                    <span className="text-white text-sm ml-2 min-w-fit">
                                      {getPlayTypeLabel(
                                        playTypeOption,
                                        selectedGame
                                      )}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div>
                            <span className="text-zinc-400 text-sm mt-6 font-bold inline-block">
                              선호하는 유저 스타일
                            </span>
                            <div className="flex flex-row space-x-2">
                              <div className="flex flex-row mt-2 space-x-4">
                                {Object.values(ProfileFriendType).map(
                                  (friendTypeOption, index) => (
                                    <div
                                      key={friendTypeOption}
                                      className="flex items-center"
                                    >
                                      <input
                                        className="bg-zinc-600"
                                        type="checkbox"
                                        checked={friendType.includes(index)}
                                        readOnly
                                        onClick={() =>
                                          setFriendType((prev) => {
                                            if (prev.includes(index)) {
                                              return prev.filter(
                                                (x) => x !== index
                                              );
                                            } else {
                                              return [...prev, index];
                                            }
                                          })
                                        }
                                      />
                                      <span className="text-white text-sm ml-2 min-w-fit">
                                        {getFriendTypeLabel(
                                          friendTypeOption,
                                          selectedGame
                                        )}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedGame === "maplestory" && (
                      <div>
                        <div>
                          <span className="text-zinc-400 text-sm mt-6 font-bold inline-block">
                            카드 배경 이미지 선택
                          </span>
                          <div className="flex flex-row space-x-2">
                            <div className="flex flex-row flex-wrap mt-2 space-x-4 justify-evenly gap-y-4">
                              {Object.values(MapleCards).map(
                                (cardBg, index) => (
                                  <div
                                    key={cardBg}
                                    className="flex items-center"
                                  >
                                    <input
                                      className="bg-zinc-600"
                                      type="radio"
                                      onChange={() => setBg(index)}
                                      value=""
                                      checked={bg === index}
                                    />
                                    <span className="text-white text-sm ml-2 min-w-fit">
                                      {cardBg}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="w-full flex justify-center mt-10">
                      <div className="space-x-2 w-[400px] flex justify-center">
                        <Button
                          className="px-4 py-2"
                          onClick={onClickStepButton("prev")}
                        >
                          이전 단계
                        </Button>
                        <Button
                          className="px-4 py-2"
                          disable={
                            age === undefined ||
                            gender === undefined ||
                            voice === undefined ||
                            playTime.length === 0 ||
                            playType.length === 0 ||
                            friendType.length === 0
                          }
                          onClick={onClickStepButton("next")}
                        >
                          다음 단계
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {currentEditTimeLine === cardEditTimelines[2] && (
                  <div className="w-full h-full py-8 px-4">
                    <h1 className="text-xl text-indigo-400 font-bold pb-4 border-b border-zinc-700">
                      카드 등록
                    </h1>
                    <div className="mt-4 w-full h-[410px] flex items-center justify-between flex-col pb-6">
                      <div className="text-lg font-bold text-white mt-28 flex flex-col justify-center items-center">
                        <span>짧은 소개글 작성</span>
                        {/* {(selectedGame === "maplestory" ||
                          selectedGame === "lostark") && (
                          <span className="text-xs text-zinc-400 inline-block mt-1 mb-4">
                            *한번 캐릭터를 등록하게 되면 24이내로 다시 등록할 수
                            없습니다.
                          </span>
                        )} */}
                        <div className="mt-8">
                          <input
                            className="h-fit px-2 focus:outline-none py-1.5 mr-2 text-white rounded font-normal bg-zinc-700 border-b-0 w-[500px]"
                            placeholder="소개글"
                            value={intro}
                            onChange={(event) => setIntro(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-x-2 w-[400px] flex justify-center">
                        <Button
                          className="px-4 py-2"
                          onClick={onClickStepButton("prev")}
                        >
                          이전 단계
                        </Button>
                        <Button
                          className="px-4 py-2"
                          disable={!cardInfo || !character}
                          onClick={() => addProfileInfo()}
                        >
                          {loading ? "Loading.." : "등록 하기"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col bg-zinc-800 px-4 w-[360px] min-h-[580px] rounded">
                <span className="text-lg mb-8 mt-8 pb-5 text-white my-1 border-b border-zinc-700 w-full text-center">
                  미리보기
                </span>
                <div className="">
                  {cardInfo && (
                    <GameCard
                      type={selectedGame}
                      data={cardInfo}
                      mapleBgIndex={bg}
                      size="w-[290px] h-[410px]"
                    />
                  )}
                </div>
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

  async function requestAddGameCharacterWithImage() {
    if (!authToken) {
      window.alert("로그인 후 다시 시도 해주세요");
      return;
    }

    if (!character || !selectedGame) {
      window.alert("이름을 작성해주세요");
      return;
    }

    setLoading(true);

    const response = await requestAddGameWithImage({
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

  async function requestAddGameCharacter() {
    if (!authToken) {
      window.alert("로그인 후 다시 시도 해주세요");
      return;
    }

    if (!character || !selectedGame) {
      window.alert("이름을 작성해주세요");
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

      if (response?.Err === `Err'${character}' 태그를 입력해주세요.`) {
        window.alert("태그를 입력해주세요.");
        return;
      }

      if (!response?.Err) {
        setCardInfo(response);
      }
    }
  }

  async function addProfileInfo() {
    if (!authToken) {
      window.alert("로그인 후 다시 시도 해주세요");
      return;
    }

    if (!intro) {
      window.alert("소개글을 작성해 주세요.");
      return;
    }

    setLoading(true);

    const response = await requestAddProfileInfo({
      id: userId,
      gameName: selectedGame,
      authToken,
      gameProfile: {
        age,
        friendType,
        gender,
        voice,
        playTime,
        playType,
        bg,
        bgCover: bg,
        desc: intro,
        lang: ProfileLang.KO,
      },
    });
    console.log(response);

    if (response) {
      setLoading(false);

      if (response?.Err === `Err'${character}' 태그를 입력해주세요.`) {
        window.alert("태그를 입력해주세요.");
        return;
      }

      if (typeof response?.games === "object") {
        router.push(`/profile/${userId}`);
      }
    }
  }

  function onClickStepButton(type: "prev" | "next") {
    return () => {
      if (currentEditTimeLine === cardEditTimelines[0] && type === "next") {
        if (!cardInfo) {
          window.alert("등록을 먼저 해주세요.");
          return;
        }

        setCurrentEditTimeLine(cardEditTimelines[1]);
      } else if (currentEditTimeLine === cardEditTimelines[1]) {
        if (type === "next") {
          setCurrentEditTimeLine(cardEditTimelines[2]);
        } else if (type === "prev") {
          setCurrentEditTimeLine(cardEditTimelines[0]);
        }
      } else if (currentEditTimeLine === cardEditTimelines[2]) {
        if (type === "prev") {
          setCurrentEditTimeLine(cardEditTimelines[1]);
        }
      }
    };
  }
};

export default CardEditContainer;
