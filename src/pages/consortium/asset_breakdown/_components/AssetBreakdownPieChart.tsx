import React from "react";
import classNames from "classnames";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "@contexts/ThemeContext";
import { ConsortiumShareProps } from "../index.page";

const memberColors = {
  "01": "bg-hyperlink-focused",
  "02": "bg-primary-600",
};

// TODO(pierregee): How to use getColor from tailwind
const COLORS = ["#2656D1", "#EA33AB", "#FFBB28", "#FF8042"];

export function AssetBreakdownPieChart({
  consortiumShares,
}: {
  consortiumShares: ConsortiumShareProps[];
}) {
  const { theme } = useTheme();
  const hasEmptyMint = consortiumShares.every((share) => share.minted === 0);
  return (
    <div className="relative flex">
      <div className="absolute flex h-full w-full flex-col items-center justify-center">
        <div className="mb-4 dark:text-gray-100">Token minted</div>
        <div className="items-start">
          {consortiumShares.map((share) => {
            const color = memberColors[share.id];
            return (
              <div
                key={share.id}
                className="text-left flex flex-row items-center pb-3"
              >
                <div className={classNames("mr-2 rounded-full p-2", color)} />
                <div className="flex flex-col dark:text-gray-100">
                  <div
                    data-testid={`Pie.Member.${share.member}.Name`}
                    className="text-sm font-semibold"
                  >
                    {share.member}
                  </div>
                  <div
                    data-testid={`Pie.Member.${share.member}.Value`}
                    className="text-xs"
                  >{`${share.minted}%`}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div data-testid="Asset.Breakdown.PieChart" className="h-full w-full">
        <ResponsiveContainer aspect={1} maxHeight={454}>
          <PieChart
            className="mb-2"
            cx="0"
            cy="0"
            width={328}
            height={328}
            onMouseEnter={() => {}}
          >
            {hasEmptyMint && (
              <Pie
                data={[{ id: "0", minted: 100 }]}
                x={0}
                y={0}
                innerRadius="87%"
                outerRadius="100%"
                fill="#8884d8"
                stroke=""
                dataKey="minted"
              >
                <Cell
                  key="empty-cell"
                  fill={theme === "dark" ? "#333333" : "#F2F2F2"}
                />
              </Pie>
            )}
            {!hasEmptyMint && (
              <Pie
                data={consortiumShares}
                x={0}
                y={0}
                innerRadius="87%"
                outerRadius="100%"
                fill="#8884d8"
                stroke=""
                dataKey="minted"
              >
                {consortiumShares.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
