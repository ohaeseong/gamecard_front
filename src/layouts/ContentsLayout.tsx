import classNames from "classnames";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const ContentsLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={classNames("flex flex-col w-full h-full border-l p-4")}>
      {children}
    </div>
  );
};

export default ContentsLayout;
