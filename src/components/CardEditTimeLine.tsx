import classNames from "classnames";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  timelines: Array<string>;
  currentTimeLine: string;
};

const CardEditTimeLine: React.FC<Props> = ({
  className,
  timelines,
  currentTimeLine,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-row w-full items-center justify-center",
        className
      )}
    >
      <ul className="relative flex items-start justify-between mt-2 pb-2">
        {timelines.map((timeline) => (
          <li
            key={timeline}
            className={classNames(
              "group mt-4 flex-1 self-stretch lg:w-[196px] lg:self-auto"
            )}
          >
            <div
              className={classNames(
                "relative h-full lg:h-auto",
                "before:bg-zinc-800 before:absolute before:-top-3 before:-left-[calc(50%-16px)] before:h-px before:w-[calc(100%-24px)] before:content-[''] group-first:before:w-0",
                "after:absolute after:-top-4 after:left-1/2 after:h-2 after:w-2 after:rounded-full after:content-['']",
                {
                  "after:bg-zinc-600": currentTimeLine !== timeline,
                  "after:bg-indigo-500": currentTimeLine === timeline,
                }
              )}
            >
              <div className="flex flex-col items-center text-center">
                <span
                  className={classNames(
                    "text-h2 group-hover:text-gray-000 font-bold capitalize"
                  )}
                ></span>
                <span className="text-sm text-white text-center">
                  {timeline}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardEditTimeLine;
