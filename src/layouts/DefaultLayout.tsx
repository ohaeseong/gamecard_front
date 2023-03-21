import Footer from "@/components/Footer";
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
    <div className="flex flex-col h-screen overflow-auto bg-zinc-900">
      <Header
        className={classNames("", {
          hidden: router.pathname === "/login",
        })}
        profile={profile}
      />
      <div className="flex flex-col h-full justify-between">
        <div className="w-full flex justify-center">
          {/* <Navigation className="mt-8 lg:block hidden" /> */}
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
