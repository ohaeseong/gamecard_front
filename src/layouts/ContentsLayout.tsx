import classNames from "classnames";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  children: React.ReactNode;
};

const ContentsLayout: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        "flex flex-col w-[1080px] h-full bg-zinc-900",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContentsLayout;
