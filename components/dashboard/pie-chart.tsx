"use client";

import { PieChart, Pie, Tooltip } from "recharts";
import { LinksWithRedirectHistory } from "@/types";

const PieChartComponent = ({
  linksWithRedirectHistory,
}: {
  linksWithRedirectHistory: LinksWithRedirectHistory[];
}) => {
  const deviceColors: Record<string, string> = {
    iPhone: "#6a8bf5",
    iPad: "#84d4e3",
    "Linux/MacOS": "#76c7b7",
    Android: "#ffcc80",
    Macintosh: "#8884d8",
    "Windows PC": "#82ca9d",
    Other: "#b5e7a0",
  };

  const browserColors: Record<string, string> = {
    Chrome: "#6a8bf5",
    Firefox: "#84d4e3",
    Opera: "#76c7b7",
    "Internet Explorer": "#ffcc80",
    Edge: "#8884d8",
    Safari: "#82ca9d",
    Other: "#b5e7a0",
  };

  const deviceCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};

  linksWithRedirectHistory.forEach((item) => {
    item.redirectHistory.forEach((historyItem) => {
      const device = historyItem.device;
      const browser = historyItem.browser;
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
      browserCounts[browser] = (browserCounts[browser] || 0) + 1;
    });
  });

  const deviceData = Object.keys(deviceCounts).map((device) => ({
    device,
    count: deviceCounts[device],
    fill: deviceColors[device] || "#bdbdbd",
  }));

  const browserData = Object.keys(browserCounts).map((browser: string) => ({
    browser,
    count: browserCounts[browser],
    fill: browserColors[browser] || "#bdbdbd",
  }));

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="mb-4 md:mr-4">
        <PieChart width={400} height={300}>
          <Pie
            dataKey="count"
            nameKey="device"
            isAnimationActive={true}
            data={deviceData}
            cx={200}
            cy={200}
            outerRadius={80}
            label={({ name, value }) => `${name}: ${value}`}
          />
          <Tooltip formatter={(value, name) => [name + ": " + value]} />
        </PieChart>
      </div>

      <div>
        <PieChart width={400} height={300}>
          <Pie
            dataKey="count"
            nameKey="browser"
            isAnimationActive={true}
            data={browserData}
            cx={200}
            cy={200}
            outerRadius={80}
            label={({ name, value }) => `${name}: ${value}`}
          />
          <Tooltip formatter={(value, name) => [name + ": " + value]} />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartComponent;
