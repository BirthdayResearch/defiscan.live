import { NumericFormat } from "react-number-format";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";

export function PoolPairInfo(props: {
  lhsComponent: () => JSX.Element;
  rhs: {
    value: string | undefined;
    suffix?: string;
    prefix?: string;
  };
  popoverDescription: string;
  testId: string;
}): JSX.Element {
  if (props.rhs.value === undefined) {
    return <></>;
  }

  return (
    <div
      className="flex flex-wrap flex-row w-full lg:w-fit mt-2 lg:mt-8 p-4 lg:p-6 rounded-lg border border-gray-200 justify-between items-center dark:border-gray-700 dark:bg-gray-800"
      data-testid={`PoolPair.${props.testId}`}
    >
      <div className="flex items-center mr-4 lg:mr-8">
        {props.lhsComponent()}
        <InfoHoverPopover description={props.popoverDescription} />
      </div>
      <NumericFormat
        displayType="text"
        className="font-medium md:text-xl dark:text-gray-100"
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        suffix={props.rhs.suffix}
        prefix={props.rhs.prefix}
        value={props.rhs.value}
      />
    </div>
  );
}
