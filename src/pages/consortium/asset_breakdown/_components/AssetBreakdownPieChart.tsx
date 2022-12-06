import classNames from "classnames";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TotalMintedByMemberProps } from "../index.page";

const memberColors = {
  Cake: "bg-hyperlink-focused",
  "Birthday Research": "bg-primary-600",
};

// TODO(pierregee): How to use getColor from tailwind
const COLORS = ["#2656D1", "#EA33AB", "#FFBB28", "#FF8042"];

export function AssetBreakdownPieChart({
  totalMintedByMember,
}: {
  totalMintedByMember: TotalMintedByMemberProps[];
}) {
  return (
    <div className="relative flex">
      <div className="absolute flex h-full w-full flex-col items-center justify-center">
        <div className="mb-4 dark:text-gray-100">Token minted</div>
        <div className="items-start">
          {totalMintedByMember.map((share) => {
            const color = memberColors[share.member];
            return (
              <div
                key={share.member}
                className="text-left flex flex-row items-center pb-3"
              >
                <div
                  className={classNames(
                    "mr-2 rounded-full bg-primary-600 p-2",
                    color
                  )}
                />
                <div className="flex flex-col dark:text-gray-100">
                  <div className="text-sm font-semibold">{share.member}</div>
                  <div className="text-xs">{`${share.value}%`}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-full w-full">
        <ResponsiveContainer aspect={1} maxHeight={454}>
          <PieChart
            className="mb-2"
            cx="0"
            cy="0"
            width={328}
            height={328}
            onMouseEnter={() => {}}
          >
            <Pie
              data={totalMintedByMember}
              x={0}
              y={0}
              innerRadius="87%"
              outerRadius="100%"
              fill="#8884d8"
              stroke=""
              dataKey="value"
            >
              {totalMintedByMember.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
