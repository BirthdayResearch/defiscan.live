import { PropsWithChildren } from "react";
import { MdEdit, MdCheckCircle } from "react-icons/md";
import { Disclosure, Transition } from "@headlessui/react";

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
    <div className="py-5 px-4 md:px-10 rounded-lg border border-gray-200 dark:border-gray-700">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="flex w-full flex-row items-center justify-between cursor-default"
              onClick={(e) => {
                if (open) {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex w-full flex-row items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {title}
                </span>
                {isCompleted && (
                  <MdCheckCircle size={24} className="text-green-500 ml-2.5" />
                )}
              </div>
              {onEdit !== undefined && (
                <div
                  className="flex flex-row items-center justify-end cursor-pointer"
                  onClick={onEdit}
                >
                  <MdEdit
                    className="mr-1 text-gray-600 dark:text-gray-100"
                    size={20}
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-100">
                    EDIT
                  </span>
                </div>
              )}
            </Disclosure.Button>
            <Transition show={open}>
              {isOpen && (
                <Disclosure.Panel className="mt-2 pb-5">
                  {children}
                </Disclosure.Panel>
              )}
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
