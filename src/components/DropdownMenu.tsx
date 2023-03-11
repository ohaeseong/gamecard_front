import { Transition, Menu } from "@headlessui/react";
import classNames from "classnames";
import React from "react";

const colorOptions = [
  { label: "검정색", value: "black" },
  { label: "흰색", value: "white" },
  { label: "빨간색", value: "red" },
  { label: "파란색", value: "blue" },
  { label: "노란색", value: "yellow" },
  { label: "녹색", value: "green" },
  { label: "핑크색", value: "pink" },
  { label: "오랜지색", value: "orange" },
  { label: "바이올랫색", value: "violet" },
  { label: "갈색", value: "brown" },
  { label: "회색", value: "gray" },
  { label: "보라색", value: "purple" },
  { label: "회색", value: "blonde" },
];

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  menus: Array<{ label: string; value: string }>;
  onClick?: (menu: { label: string; value: string }) => void;
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
            <Menu.Item key={menu.label + index}>
              <div
                className={classNames("cursor-pointer p-2")}
                onClick={onClick(menu)}
              >
                {menu.label}
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );

  function onClick(menu: { label: string; value: string }) {
    if (typeof _onClick !== "function") return;

    return () => {
      _onClick(menu);
    };
  }
};

export default DropdownMenu;
