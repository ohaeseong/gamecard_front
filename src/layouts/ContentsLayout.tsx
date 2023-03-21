import classNames from "classnames";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  children: React.ReactNode;
};

const ContentsLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className={classNames("flex flex-col w-[1080px] h-full p-4 bg-zinc-900")}
    >
      {children}
    </div>
  );
};

export default ContentsLayout;
