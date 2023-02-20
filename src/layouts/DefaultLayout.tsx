import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { IProfile } from "@/types/Account";
import classNames from "classnames";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
  profile?: IProfile;
};

const DefaultLayout: React.FC<Props> = ({ children, profile }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Header
        className={classNames("", {
          hidden: router.pathname === "/login",
        })}
        profile={profile}
      />
      <div className="flex flex-row h-full">
        <Navigation className="mt-8 lg:block hidden" />
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
