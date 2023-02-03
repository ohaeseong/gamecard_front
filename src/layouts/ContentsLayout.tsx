import classNames from "classnames";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const ContentsLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div
      className={classNames(
        "flex flex-col lg:w-content w-full justify-center items-center"
        // {
        //   "h-full": router.pathname === "/login",
        //   "h-[calc(100vh-56px)] overflow-auto": router.pathname !== "/login",
        // }
      )}
    >
      {children}
    </div>
  );
};

export default ContentsLayout;
