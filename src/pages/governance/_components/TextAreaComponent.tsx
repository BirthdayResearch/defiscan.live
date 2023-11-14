import React, { useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
import classNames from "classnames";
import { useWindowDimensions } from "hooks/useWindowDimensions";

interface TextAreaComponentProps {
  label: string;
  error: string;
  note?: string;
  value: string | number;
  placeholder: string;
  infoDesc?: string;
  isVisited: boolean;
  onBlur: () => void;
  onChange: (value: string | number) => void;
  testid?: string;
}

export function TextAreaComponent({
  label,
  value,
  placeholder,
  infoDesc,
  note,
  onChange,
  onBlur,
  isVisited,
  error,
  testid,
}: TextAreaComponentProps): JSX.Element {
  const ref = useRef<HTMLTextAreaElement>(null);
  const dimension = useWindowDimensions();
  useEffect(() => {
    if (ref.current) {
      // Set initial base height to get the correct scrollHeight
      ref.current.style.height = "24px";
      // Then set the height = scrollHeight
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref, value, dimension]);

  return (
    <div data-testid={testid} className="flex flex-col w-full">
      <div className="flex flex-row w-full">
        <span className="text-xs font-medium text-gray-900 dark:text-dark-gray-900">
          {label}
        </span>
        {infoDesc !== undefined && (
          <InfoHoverPopover
            className="ml-1 self-center"
            description={infoDesc}
            placement="top"
          />
        )}
      </div>
      <div className="mt-1">
        <div
          className={classNames(
            "flex flex-row py-3 px-4 bg-white dark:bg-dark-gray-50 border rounded",
            isVisited && error !== ""
              ? "border-red-500"
              : "border-gray-300 dark:border-dark-gray-300"
          )}
        >
          <textarea
            ref={ref}
            value={value}
            spellCheck={false}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
            className="w-full mr-2 resize-none h-6 bg-white dark:bg-dark-gray-50 text-gray-900 dark:text-dark-gray-900 focus:outline-none text-base placeholder:text-gray-400 placeholder:dark:text-dark-gray-400"
          />
          {value !== "" && (
            <button
              data-testid={`${testid}.ClearForm`}
              type="button"
              className="rounded-full h-4 w-4 bg-gray-100 self-center cursor-pointer text-center"
              onClick={() => onChange("")}
            >
              <MdClose
                size={12}
                className="text-gray-500 self-center cursor-pointer m-auto"
              />
            </button>
          )}
        </div>
        <div
          data-testid="Governance.Create.Step1.TextArea.ErrorMsg"
          className="mt-1"
        >
          {isVisited && error !== "" ? (
            <span className="text-xs text-red-500 dark:text-dark-red-500">
              {error}
            </span>
          ) : (
            <>
              {note !== undefined && (
                <span className="text-xs text-gray-600 dark:text-dark-gray-600">
                  {note}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
