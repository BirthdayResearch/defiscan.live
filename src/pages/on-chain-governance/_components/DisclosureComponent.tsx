import React, { PropsWithChildren } from "react";
import { MdEdit, MdCheckCircle } from "react-icons/md";
import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";

export function DisclosureComponent({
  title,
  children,
  isOpen,
  isCompleted = false,
  onEdit,
}: PropsWithChildren<{
  title: string;
  isOpen: boolean;
  isCompleted?: boolean;
  onEdit?: () => void;
}>) {
  return (
    <div className="py-5 px-6 md:px-10 rounded-lg border border-gray-200 dark:border-gray-700">
      <Disclosure defaultOpen>
        <div className={classNames({ "py-5": isOpen })}>
          <Disclosure.Button className="flex w-full flex-row items-center justify-between cursor-default">
            <div className="flex w-full flex-row items-center">
              <span
                className={classNames(
                  "text-base md:text-lg font-medium",
                  isOpen || isCompleted
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-400"
                )}
              >
                {title}
              </span>
              {isCompleted && (
                <MdCheckCircle className="text-green-500 ml-2.5 h-4 w-4 md:h-6 md:w-6" />
              )}
            </div>
            {onEdit !== undefined && (
              <div
                className="flex flex-row items-center justify-end cursor-pointer"
                onClick={onEdit}
              >
                <MdEdit className="mr-1 text-gray-600 dark:text-gray-100 h-6 w-6 md:h-5 md:w-5" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-100 hidden md:block">
                  EDIT
                </span>
              </div>
            )}
          </Disclosure.Button>
          <Transition show={isOpen}>
            {isOpen && (
              <Disclosure.Panel className="mt-2">{children}</Disclosure.Panel>
            )}
          </Transition>
        </div>
      </Disclosure>
    </div>
  );
}
