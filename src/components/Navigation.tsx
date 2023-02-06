import classNames from "classnames";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

interface IMenu {
  label: string;
  href?: string;
}

const menus: Array<IMenu> = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "profile",
    href: "/profile",
  },
  {
    label: "card",
  },
  {
    label: "cummunity",
    href: "/cummunity",
  },
  {
    label: "settings",
    href: "/settings",
  },
];

const Navigation: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const userId = Cookies.get("userId");
  return (
    <div
      className={classNames(
        "h-14 w-full bg-indigo-500 fixed bottom-0",
        className,
        {
          hidden: router.pathname === "/login",
        }
      )}
    >
      <ul className="flex flex-row justify-around text-gray-100 items-center h-full">
        {menus.map(({ label, href }) => (
          <li
            key={label}
            className="h-full w-full capitalize flex items-center justify-center text-xs md:text-base"
          >
            {label !== "card" && href ? (
              <span className="cursor-pointer" onClick={goToHref(href)}>
                {label}
              </span>
            ) : (
              <div className="md:w-44 w-full h-full border-4 border-indigo-300 rounded-2xl flex items-center justify-center cursor-pointer">
                {label}
              </div>
            )}
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
