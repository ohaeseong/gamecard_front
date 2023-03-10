import { Transition, Menu } from "@headlessui/react";
import classNames from "classnames";
import React from "react";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  menus: Array<string>;
  onClick?: (menu: string) => void;
  selected?: string;
};

const DropdownMenu: React.FC<Props> = ({
  className,
  menus,
  onClick: _onClick,
  selected,
}) => {
  return (
    <Menu
      as="div"
      className={classNames("relative inline-block text-left", className)}
    >
      <div>
        <Menu.Button className="inline-flex w-full capitalize justify-center rounded-md bg-indigo-500 hover:bg-opacity-90 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {!selected ? "옵션" : selected}
        </Menu.Button>
      </div>
      <Transition
        as="div"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute h-60 overflow-auto left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menus.map((menu, index) => (
            <Menu.Item key={menu + index}>
              <div
                className={classNames("cursor-pointer p-2")}
                onClick={onClick(menu)}
              >
                {menu}
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );

  function onClick(menu: string) {
    if (typeof _onClick !== "function") return;

    return () => {
      _onClick(menu);
    };
  }
};

export default DropdownMenu;
