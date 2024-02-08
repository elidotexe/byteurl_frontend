"use client";

import { PieChart, Pie, Tooltip } from "recharts";

const linkPerformance = [
  {
    id: 22,
    userId: 1,
    title: "Youtube",
    originalUrl: "https://youtube.com/watch?v=-CwzaTKniH4",
    shortenUrl: "GLRea_uOSl",
    clicks: 0,
    redirectHistory: [],
    createdAt: "2024-02-08T20:33:01.76381Z",
    updatedAt: "2024-02-08T20:33:01.76381Z",
  },
  {
    id: 20,
    userId: 1,
    title: "New shiiiit",
    originalUrl: "http://yandex.ru",
    shortenUrl: "Fz1PZI6Re-",
    clicks: 157,
    redirectHistory: [
      {
        id: 1,
        linkId: 20,
        device: "iPhone",
        browser: "Opera",
        ipAddress: "Unknown",
        createdAt: "2024-01-26T22:28:14.545613Z",
      },
      {
        id: 2,
        linkId: 20,
        device: "iPad",
        browser: "Opera",
        ipAddress: "Unknown",
        createdAt: "2024-01-26T22:29:20.65405Z",
      },
      {
        id: 3,
        linkId: 20,
        device: "Linux/MacOS",
        browser: "Chrome",
        ipAddress: "89.149.23.108",
        createdAt: "2024-01-28T18:19:09.633535Z",
      },
      {
        id: 4,
        linkId: 20,
        device: "Android",
        browser: "Chrome",
        ipAddress: "89.149.23.108",
        createdAt: "2024-01-28T18:19:24.694822Z",
      },
      {
        id: 5,
        linkId: 20,
        device: "Android",
        browser: "Firefox",
        ipAddress: "89.149.23.108",
        createdAt: "2024-01-28T18:19:32.071587Z",
      },
      {
        id: 6,
        linkId: 20,
        device: "Other",
        browser: "Firefox",
        ipAddress: "89.149.23.108",
        createdAt: "2024-01-28T18:19:40.266939Z",
      },
      {
        id: 7,
        linkId: 20,
        device: "Macintosh",
        browser: "Internet Explorer",
        ipAddress: "89.149.23.108",
        createdAt: "2024-01-28T18:20:40.804007Z",
      },
      {
        id: 8,
        linkId: 20,
        device: "Macintosh",
        browser: "Edge",
        ipAddress: "188.28.237.61",
        createdAt: "2024-01-30T20:11:23.661919Z",
      },
      {
        id: 9,
        linkId: 20,
        device: "Macintosh",
        browser: "Safari",
        ipAddress: "92.40.111.88",
        createdAt: "2024-02-05T22:44:14.852154Z",
      },
      {
        id: 10,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.88",
        createdAt: "2024-02-05T22:44:24.054339Z",
      },
      {
        id: 11,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-06T15:16:38.041589Z",
      },
      {
        id: 12,
        linkId: 20,
        device: "Macintosh",
        browser: "Other",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-06T15:17:38.53821Z",
      },
      {
        id: 13,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-06T15:22:48.262697Z",
      },
      {
        id: 14,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-06T21:52:57.636673Z",
      },
      {
        id: 15,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-06T22:15:37.073124Z",
      },
      {
        id: 16,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-06T22:39:33.646426Z",
      },
      {
        id: 17,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-07T20:58:04.688817Z",
      },
      {
        id: 18,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-07T22:17:46.149152Z",
      },
      {
        id: 19,
        linkId: 20,
        device: "Macintosh",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-08T18:13:33.093702Z",
      },
      {
        id: 20,
        linkId: 20,
        device: "Windows PC",
        browser: "Chrome",
        ipAddress: "92.40.111.44",
        createdAt: "2024-02-08T20:35:53.219045Z",
      },
    ],
    createdAt: "2024-01-16T22:01:41.435113Z",
    updatedAt: "2024-02-08T20:35:53.028988Z",
  },
  {
    id: 21,
    userId: 1,
    title: "Reddit",
    originalUrl: "https://www.reddit.com/",
    shortenUrl: "pLToAM63Gh",
    clicks: 3,
    redirectHistory: [],
    createdAt: "2024-02-08T19:05:26.925757Z",
    updatedAt: "2024-02-08T20:35:59.930215Z",
  },
  {
    id: 23,
    userId: 1,
    title: "Yandex",
    originalUrl: "http://yandex.ru",
    shortenUrl: "psDVjXVTM0",
    clicks: 2,
    redirectHistory: [],
    createdAt: "2024-02-08T20:36:23.923391Z",
    updatedAt: "2024-02-08T20:36:43.472662Z",
  },
];

const PieChartComponent = () => {
  const deviceColors: Record<string, string> = {
    iPhone: "#6a8bf5",
    iPad: "#84d4e3",
    "Linux/MacOS": "#76c7b7",
    Android: "#ffcc80",
    Macintosh: "#8884d8",
    "Windows PC": "#82ca9d",
    Other: "#b5e7a0",
  };

  const browserColors = {
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

  linkPerformance.forEach((item) => {
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
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-center">Device Chart</h2>
        <PieChart width={500} height={500}>
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
        <h2 className="text-center">Browser Chart</h2>
        <PieChart width={500} height={500}>
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
