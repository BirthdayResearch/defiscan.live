import React from "react";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";

export function CountdownSection(props: {
  timeLeftSecs: number;
  estimatedTargetTime: number;
}): JSX.Element {
  let days = Math.floor(props.timeLeftSecs / (3600 * 24));
  let hours = Math.floor((props.timeLeftSecs - days * (3600 * 24)) / 3600);
  let mins = Math.floor(
    (props.timeLeftSecs - days * (3600 * 24) - hours * 3600) / 60
  );
  let secs = props.timeLeftSecs - days * (3600 * 24) - hours * 3600 - mins * 60;

  if (props.timeLeftSecs <= 0) {
    days = 0;
    hours = 0;
    mins = 0;
    secs = 0;
  }

  return (
    <div className="flex flex-wrap justify-center -m-2 mt-8">
      <CountdownTime value={days} label="Days" testId="Days" />
      <CountdownTime value={hours} label="Hours" testId="Hours" />
      <CountdownTime value={mins} label="Minutes" testId="Minutes" />
      <CountdownTime value={secs} label="Seconds" testId="Seconds" />

      <div className="w-full flex items-center lg:w-4/6 mt-2 md:mt-0 px-0.5 md:px-2 text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          Estimated Target Date:
        </span>
        <span className="ml-1 text-gray-900 font-medium dark:text-dark-gray-900">
          {new Date(props.estimatedTargetTime).toString()}
        </span>
        <InfoHoverPopover
          className="ml-1 self-center"
          description={
            "Estimated based on the number of blocks remaining and from the current block's median time."
          }
          placement="bottom"
        />
      </div>
    </div>
  );
}

function CountdownTime(props: {
  value: number;
  label: string;
  testId: string;
}): JSX.Element {
  return (
    <div className="p-0.5 md:p-2 w-1/4 lg:w-1/6">
      <div
        className="flex flex-wrap rounded dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 border py-4 md:py-8 text-center"
        data-testid={`CountdownSection.${props.testId}`}
      >
        <div
          className="w-full text-xl sm:text-2xl md:text-4xl xl:text-5xl font-medium overflow-hidden overflow-ellipsis"
          data-testid={`CountdownSection.${props.testId}.value`}
        >
          {props.value}
        </div>
        <div
          className="w-full mt-1 text-sm md:text-base"
          data-testid={`CountdownSection.${props.testId}.label`}
        >
          {props.label}
        </div>
      </div>
    </div>
  );
}
