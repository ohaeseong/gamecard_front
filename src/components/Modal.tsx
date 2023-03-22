import { Transition, Dialog } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  isOpen: boolean;
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  className,
  title,
  isOpen,
  closeModal,
  children,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  "transform rounded bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all",
                  className
                )}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-indigo-400 mb-2"
                >
                  <div className="flex-1 flex justify-between">
                    <span>{title}</span>
                    <RxCross2
                      className="w-6 h-6 cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>
                </Dialog.Title>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
