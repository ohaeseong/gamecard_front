/* eslint-disable @next/next/no-img-element */
import {
  IMapleStory,
  ServicedGames,
  ILostArk,
  ProfileAge,
  ProfileGender,
  ProfileVoice,
  ProfilePlayTime,
  ProfilePlayType,
  ProfileFriendType,
} from "@/types/Game";
import {
  getAgeLabel,
  getFriendTypeLabel,
  getGenderLabel,
  getPlayTimeLabel,
  getPlayTypeLabel,
} from "@/utils/profile";
import classNames from "classnames";
import Image from "next/image";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  type: string;
  data: IMapleStory | ILostArk;
  selected?: boolean;
  size?: string;
};

const GameCard: React.FC<Props> = ({
  className,
  type,
  data,
  selected,
  // size = "min-w-[360px] min-h-[480px]",
}) => {
  return (
    <div className={classNames("rounded p-4 w-[320px] h-[460px]", className)}>
      <div className="w-full h-full rounded">
        {type === "maplestory" && (
          <div className="relative w-full h-full">
            <div
              className="w-full h-full bg-contain bg-no-repeat pl-[13px] pr-[16px] pt-[13px] items-center flex flex-col"
              style={{
                backgroundImage: "url(/images/cards/maple-card-1.png)",
              }}
            >
              <div className="h-10 w-full text-white flex items-center justify-between bg-black px-2 bg-opacity-70 text-sm font-semibold">
                <span>메이플스토리</span>
                <Image
                  src="/images/symbols/maplestory_icon.jpg"
                  width={20}
                  height={20}
                  alt="maple_icon"
                />
              </div>
              <div className="h-80 flex justify-center items-center px-4 flex-col">
                <img
                  className="w-64 h-64"
                  src={data.imageUrl}
                  alt="maple_image"
                />
                <div className="flex w-full justify-between px-1">
                  <span className="font-bold text-white text-lg">
                    {data.name}
                  </span>
                  <span className="text-white font-bold text-sm">
                    Lv - {data.level}
                  </span>
                </div>
                <div className="flex w-full justify-between px-1">
                  <span className="font-bold text-white text-sm">
                    Job - {data.job}
                  </span>
                  <span className="text-white font-bold text-sm">
                    World - {data.world}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                "bg-zinc-800 w-full h-full absolute top-0 left-full p-4 rounded-[10px] ml-2"
              )}
            >
              <div className="flex flex-col">
                <div className="text-white font-bold mb-2 w-full border-b border-zinc-700 pb-2">
                  {data.name}
                </div>
                <div>
                  <h1 className="text-zinc-200 text-xs">나이</h1>
                  <div className="flex flex-row space-x-2 mt-1">
                    {Object.values(ProfileAge).map((ageOption, index) => (
                      <div key={ageOption} className="flex items-center">
                        <span
                          className={classNames("text-white text-xs", {
                            "text-indigo-500 border-b border-zinc-400":
                              index === data.profile?.age,
                            "text-zinc-500": index !== data.profile?.age,
                          })}
                        >
                          {getAgeLabel(ageOption)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h1 className="text-zinc-200 text-xs mt-3">성별</h1>
                  <div className="flex flex-row mt-1 space-x-4">
                    {Object.values(ProfileGender).map((genderOption, index) => (
                      <div
                        key={genderOption}
                        className="flex items-center space-x-2"
                      >
                        <span
                          className={classNames("text-white text-xs", {
                            "text-indigo-500 border-b border-zinc-400":
                              index === data.profile?.gender,
                            "text-zinc-500": index !== data.profile?.gender,
                          })}
                        >
                          {getGenderLabel(genderOption)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className=" border-b pb-3 border-zinc-700">
                  <h1 className="text-zinc-200 text-xs mt-3">마이크 가능</h1>
                  <div className="flex flex-row space-x-2 mt-1">
                    {Object.values(ProfileVoice).map((voiceOption, index) => (
                      <div key={voiceOption} className="flex items-center">
                        <span
                          className={classNames("text-white text-xs", {
                            "text-indigo-500 border-b border-zinc-400":
                              index === data.profile?.age,
                            "text-zinc-500": index !== data.profile?.age,
                          })}
                        >
                          {voiceOption === "yes" ? "가능" : "불가능"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h1 className="text-zinc-200 text-xs mt-3">활동 시간대</h1>
                  <div className="flex flex-row space-x-2 mt-1">
                    {Object.values(ProfilePlayTime).map(
                      (playTimeOption, index) => (
                        <div key={playTimeOption} className="flex items-center">
                          {data.profile?.playTime.map((optionIndex) => (
                            <span
                              key={optionIndex}
                              className={classNames("text-white text-xs", {
                                "text-indigo-500 border-b border-zinc-400":
                                  index === optionIndex,
                                "text-zinc-500": index !== optionIndex,
                              })}
                            >
                              {getPlayTimeLabel(playTimeOption)}
                            </span>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h1 className="text-zinc-200 text-xs mt-3">
                    내 플레이 스타일
                  </h1>
                  <div className="flex flex-row space-x-2 mt-1">
                    {Object.values(ProfilePlayType).map(
                      (playTypeOption, index) => (
                        <div key={playTypeOption} className="flex items-center">
                          {data.profile?.playTime.map((optionIndex) => (
                            <span
                              key={optionIndex}
                              className={classNames("text-white text-xs", {
                                "text-indigo-500 border-b border-zinc-400":
                                  index === optionIndex,
                                "text-zinc-500": index !== optionIndex,
                              })}
                            >
                              {getPlayTypeLabel(playTypeOption, type)}
                            </span>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="border-b pb-3 border-zinc-700">
                  <h1 className="text-zinc-200 text-xs mt-3">
                    선호하는 유저 스타일
                  </h1>
                  <div className="flex flex-row space-x-2 mt-1">
                    {Object.values(ProfileFriendType).map(
                      (friendTypeOption, index) => (
                        <div
                          key={friendTypeOption}
                          className="flex items-center"
                        >
                          {data.profile?.playTime.map((optionIndex) => (
                            <span
                              key={optionIndex}
                              className={classNames("text-white text-xs", {
                                "text-indigo-500 border-b border-zinc-400":
                                  index === optionIndex,
                                "text-zinc-500": index !== optionIndex,
                              })}
                            >
                              {getFriendTypeLabel(friendTypeOption, type)}
                            </span>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="text-sm font-bold text-white flex items-center justify-center h-12 pt-2">
                  {data?.profile?.desc}
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "lostark" && (
          <div className="relative w-full h-full">
            <div
              className="w-full h-full bg-contain bg-no-repeat pl-[13px] pr-[16px] pt-[13px] items-center flex flex-col"
              style={{
                backgroundImage: "url(/images/cards/lostark-card-1.png)",
              }}
            >
              <div>
                <div className="h-10 bg-black w-full bg-opacity-70 text-white flex items-center justify-between px-4 py-2 text-sm font-semibold">
                  <span>로스트 아크</span>
                  <Image
                    src="/images/symbols/lostark_icon.jpg"
                    width={20}
                    height={20}
                    alt="maple_icon"
                  />
                </div>
                <div className="h-80 flex justify-center items-center px-4 flex-col">
                  <img
                    className={classNames("w-52 h-52 mb-6 mt-10 rounded")}
                    src={data.imageUrl}
                    alt="lostark_image"
                  />
                  <div className="flex w-full justify-between">
                    <span className="font-bold text-white text-lg">
                      {data.name}
                    </span>
                    <span className="text-white font-bold text-sm">
                      Lv - {data.level}
                    </span>
                  </div>
                  <div className="flex w-full justify-between">
                    <span className="font-bold text-white text-sm">
                      Job - {data.job}
                    </span>
                    <span className="text-white font-bold text-sm">
                      World - {data.world}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  "bg-zinc-800 w-full h-full absolute top-0 left-full p-4 rounded-[10px] ml-2"
                )}
              >
                <div className="flex flex-col">
                  <div className="text-white font-bold mb-2 w-full border-b border-zinc-700 pb-2">
                    {data.name}
                  </div>
                  <div>
                    <h1 className="text-zinc-200 text-xs">나이</h1>
                    <div className="flex flex-row space-x-2 mt-1">
                      {Object.values(ProfileAge).map((ageOption, index) => (
                        <div key={ageOption} className="flex items-center">
                          <span
                            className={classNames("text-white text-xs", {
                              "text-indigo-500 border-b border-zinc-400":
                                index === data.profile?.age,
                              "text-zinc-500": index !== data.profile?.age,
                            })}
                          >
                            {getAgeLabel(ageOption)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h1 className="text-zinc-200 text-xs mt-3">성별</h1>
                    <div className="flex flex-row mt-1 space-x-4">
                      {Object.values(ProfileGender).map(
                        (genderOption, index) => (
                          <div
                            key={genderOption}
                            className="flex items-center space-x-2"
                          >
                            <span
                              className={classNames("text-white text-xs", {
                                "text-indigo-500 border-b border-zinc-400":
                                  index === data.profile?.gender,
                                "text-zinc-500": index !== data.profile?.gender,
                              })}
                            >
                              {getGenderLabel(genderOption)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className=" border-b pb-3 border-zinc-700">
                    <h1 className="text-zinc-200 text-xs mt-3">마이크 가능</h1>
                    <div className="flex flex-row space-x-2 mt-1">
                      {Object.values(ProfileVoice).map((voiceOption, index) => (
                        <div key={voiceOption} className="flex items-center">
                          <span
                            className={classNames("text-white text-xs", {
                              "text-indigo-500 border-b border-zinc-400":
                                index === data.profile?.age,
                              "text-zinc-500": index !== data.profile?.age,
                            })}
                          >
                            {voiceOption === "yes" ? "가능" : "불가능"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h1 className="text-zinc-200 text-xs mt-3">활동 시간대</h1>
                    <div className="flex flex-row space-x-2 mt-1">
                      {Object.values(ProfilePlayTime).map(
                        (playTimeOption, index) => (
                          <div
                            key={playTimeOption}
                            className="flex items-center"
                          >
                            {data.profile?.playTime.map((optionIndex) => (
                              <span
                                key={optionIndex}
                                className={classNames("text-white text-xs", {
                                  "text-indigo-500 border-b border-zinc-400":
                                    index === optionIndex,
                                  "text-zinc-500": index !== optionIndex,
                                })}
                              >
                                {getPlayTimeLabel(playTimeOption)}
                              </span>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h1 className="text-zinc-200 text-xs mt-3">
                      내 플레이 스타일
                    </h1>
                    <div className="flex flex-row space-x-2 mt-1">
                      {Object.values(ProfilePlayType).map(
                        (playTypeOption, index) => (
                          <div
                            key={playTypeOption}
                            className="flex items-center"
                          >
                            {data.profile?.playTime.map((optionIndex) => (
                              <span
                                key={optionIndex}
                                className={classNames("text-white text-xs", {
                                  "text-indigo-500 border-b border-zinc-400":
                                    index === optionIndex,
                                  "text-zinc-500": index !== optionIndex,
                                })}
                              >
                                {getPlayTypeLabel(playTypeOption, type)}
                              </span>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="border-b pb-3 border-zinc-700">
                    <h1 className="text-zinc-200 text-xs mt-3">
                      선호하는 유저 스타일
                    </h1>
                    <div className="flex flex-row space-x-2 mt-1">
                      {Object.values(ProfileFriendType).map(
                        (friendTypeOption, index) => (
                          <div
                            key={friendTypeOption}
                            className="flex items-center"
                          >
                            {data.profile?.playTime.map((optionIndex) => (
                              <span
                                key={optionIndex}
                                className={classNames("text-white text-xs", {
                                  "text-indigo-500 border-b border-zinc-400":
                                    index === optionIndex,
                                  "text-zinc-500": index !== optionIndex,
                                })}
                              >
                                {getFriendTypeLabel(friendTypeOption, type)}
                              </span>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="text-sm font-bold text-white flex items-center justify-center h-12 pt-2">
                    {data?.profile?.desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "valorant" && <>{"Valorant"}</>}

        {type === "lol" && <>{"Lol"}</>}
      </div>
    </div>
  );

  function getProfileCardBackgroundImage(type: string) {
    if (type === "maplestory") {
      // if (isNil(bg)) {
      return "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4) ),url(/images/cover/maple_card_cover.jpg)";
      // } else {
      // return `url(https://g.gamecard.gg/bg/maplestory/${bg}.png)`;
      // }
    }

    if (type === "lostark") {
      // if (isNil(bg)) {
      return "url(https://g.gamecard.gg/bg/lostark/default.png)";
      // } else {
      //   return `url(https://g.gamecard.gg/bg/lostark/${bg}.png)`;
      // }
    }
  }
};

export default GameCard;
