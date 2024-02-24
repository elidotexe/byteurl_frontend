"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { LinksWithRedirectHistory } from "@/types";

const AreaChartComponent = ({
  linksWithRedirectHistory,
}: {
  linksWithRedirectHistory: LinksWithRedirectHistory[];
}) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const performanceByMonth = monthNames.map((month, index) => {
    const monthIndex = index + 1;
    const totalClicks = linksWithRedirectHistory.reduce((total, link) => {
      const clicksInMonth = link.redirectHistory.filter((historyItem) => {
        const historyMonth = new Date(historyItem.createdAt).getMonth() + 1;
        return historyMonth === monthIndex;
      }).length;
      return total + clicksInMonth;
    }, 0);
    return { month, clicks: totalClicks };
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <h2 className="text-center">Monthly Click Performance</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={500}
          height={400}
          data={performanceByMonth}
          margin={{ top: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey="clicks"
            name="Clicks"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
