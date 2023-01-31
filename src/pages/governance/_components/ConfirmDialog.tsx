import React from "react";
import { Dialog, Transition } from "@headlessui/react";

export function ConfirmDialog({ isOpen, onConfirm, onClose }) {
  return (
    <Transition
      appear
      show={isOpen}
      as="div"
      data-testid="Governance.Create.ConfirmDialog"
    >
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        <Transition.Child as="div">
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2.5px]" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-8 text-center">
            <Transition.Child as="div">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[10px] bg-white dark:bg-dark-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  data-testid="Governance.Create.ConfirmDialog.Title"
                  as="h3"
                  className="font-semibold text-2xl text-gray-900 dark:text-dark-gray-900"
                >
                  Confirm Edit
                </Dialog.Title>
                <div className="mt-2 mb-10">
                  <span
                    data-testid="Governance.Create.ConfirmDialog.Description"
                    className="text-lg text-gray-600 dark:text-dark-gray-600"
                  >
                    Changing the type of proposal would cause all data to reset.
                    Are you sure you want to continue?
                  </span>
                </div>

                <div className="flex flex-row space-x-2">
                  <button
                    data-testid="Governance.Create.ConfirmDialog.CancelButton"
                    onClick={onClose}
                    type="button"
                    className="text-sm w-1/2 py-4 border rounded-sm font-medium border-gray-300 dark:border-dark-gray-300 text-primary-500 dark:text-dark-primary-500 hover:border-primary-200 hover:dark:border-dark-primary-300"
                  >
                    CANCEL
                  </button>
                  <button
                    data-testid="Governance.Create.ConfirmDialog.ConfirmButton"
                    type="button"
                    onClick={onConfirm}
                    className="text-sm w-1/2 py-4 rounded-sm font-medium border border-primary-50 dark:border-dark-primary-50 text-primary-500 dark:text-dark-primary-500 bg-primary-50 dark:bg-dark-primary-50 hover:bg-primary-100 hover:border-primary-100 hover:dark:bg-dark-primary-100 hover:dark:border-dark-primary-100"
                  >
                    CONFIRM
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
