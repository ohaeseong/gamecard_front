/* eslint-disable @next/next/no-img-element */
import { IMapleStory, ServicedGames, ILostArk } from "@/types/Game";
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
  size = "min-w-[360px] min-h-[480px]",
}) => {
  return (
    <div
      className={classNames(
        "bg-gradient-to-tr rounded p-4 hover:to-[#d558c8] hover:from-[#24d292]",
        className,
        {
          "to-[#d558c8] from-[#24d292]": selected,
          "to-[#9E8FB2] from-[#A7ACD9]": !selected,
        },
        size
      )}
    >
      <div
        className="w-full h-full rounded flex flex-col bg-cover bg-center"
        style={{
          backgroundImage: getProfileCardBackgroundImage(type),
        }}
      >
        {type === "maplestory" && (
          <>
            <div className="h-10 bg-black bg-opacity-40 text-white flex items-center justify-between px-4 pt-2 text-sm font-semibold">
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
            <div className="h-[86px]"></div>
          </>
        )}

        {type === "lostark" && (
          <>
            <div className="h-10 bg-black bg-opacity-40 text-white flex items-center justify-between px-4 py-2 text-sm font-semibold">
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
                className={classNames("w-64 h-64 my-2 rounded")}
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
            <div className="h-[86px]"></div>
          </>
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
