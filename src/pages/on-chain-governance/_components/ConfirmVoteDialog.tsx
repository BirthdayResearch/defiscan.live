import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClear } from "react-icons/md";

export function ConfirmVoteDialog({ isOpen, onConfirm, onClose }) {
  return (
    <Transition appear show={isOpen} as="div">
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child as="div">
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2.5px]" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-8 text-center">
            <Transition.Child as="div">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[10px] bg-white p-8 pt-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end">
                  <MdClear size={24} className="text-gray-600" />
                </div>
                <Dialog.Title
                  as="h3"
                  className="font-semibold text-2xl text-gray-900 dark:text-gray-100"
                >
                  Confirm your vote
                </Dialog.Title>
                <div className="mt-2 mb-6">
                  <span className="text-lg text-gray-600 dark:text-gray-100">
                    Confirm your masternode and vote on the proposal
                  </span>
                </div>

                <div className="flex flex-row space-x-2">
                  <button
                    onClick={onClose}
                    type="button"
                    className="text-sm w-1/2 py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    onClick={onConfirm}
                    className="text-sm w-1/2 py-4 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100"
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
