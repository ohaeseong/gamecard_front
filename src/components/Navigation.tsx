import classNames from "classnames";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ImFilePicture } from "react-icons/im";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

interface IMenu {
  label: string;
  icon: string;
  href?: string;
}

const menus: Array<IMenu> = [
  {
    label: "이미지",
    icon: "picture",
    href: "/",
  },
  // {
  //   label: "profile",
  //   href: "/profile",
  // },
  // {
  //   label: "card",
  // },
  // {
  //   label: "cummunity",
  //   href: "/cummunity",
  // },
  // {
  //   label: "settings",
  //   href: "/settings",
  // },
];

const Navigation: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const userId = Cookies.get("userId");
  return (
    <div
      className={classNames("h-full", className, {
        hidden: router.pathname === "/login",
      })}
    >
      <ul className="flex flex-col items-center h-full w-64 space-y-2">
        {menus.map(({ label, icon, href }) => (
          <li
            key={label}
            className="font-bold space-x-2 w-full capitalize flex items-center justify-center"
          >
            {icon === "picture" && (
              <ImFilePicture className="h-5 w-5" color="gray" />
            )}
            <div className="border-b w-fit cursor-pointer text-indigo-600 text-xs md:text-base">
              {label}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  function goToHref(href: string) {
    if (href === "/profile" && !userId) {
      return () => {
        window.alert("로그인 후 이용해 주세요!");
      };
    }

    if (href === "/profile") {
      return () => {
        router.push(`${href}/${userId}`);
      };
    }

    return () => {
      router.push(href);
    };
  }
};

export default Navigation;
