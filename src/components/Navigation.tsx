import classNames from "classnames";
import Link from "next/link";

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
  return (
    <div
      className={classNames("h-20 w-full bg-gray-900", {
        className,
      })}
    >
      <ul className="flex flex-row justify-around text-gray-100 items-center h-full">
        {menus.map(({ label, href }) => (
          <>
            {label !== "card" && href ? (
              <Link key={label} href={href}>
                <li className="">{label}</li>
              </Link>
            ) : (
              <div>{label}</div>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
