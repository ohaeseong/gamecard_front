import classNames from "classnames";
import Link from "next/link";
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
              <Link href={href} onClick={checkAuthToken}>
                <span>{label}</span>
              </Link>
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

  function checkAuthToken() {
    return;
  }
};

export default Navigation;
