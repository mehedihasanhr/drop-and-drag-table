import React, { useState, useEffect } from "react";
import { Area, G2, Line } from "@ant-design/plots";
import { TimePicker } from "antd";
import { fromPairs } from "lodash";

const DemoLine = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2023-03-28");
  const [timeRange, setTimeRange] = useState(null);

  const [workingDates, setWorkingDates] = useState([]);

  const [filter, setFilter] = useState({
    h: 1,
    s: null,
    e: null,
  });

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("https://seopage1erp.website/api/projecttimelogs")
      .then((response) => response.json())
      .then((json) => {
        let t = json.data;
        console.log(t);
        setData(t);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const format = (date) => {
    let filterdData = data.filter((d) =>
      d.end_time === null
        ? true
        : new Date(d.end_time).getDate() === new Date(date).getDate()
    );

    console.log({ filterdData });

    // get all times
    let times = [];
    let gd = [];

    filterdData.map((f) =>
      f.end_time !== null
        ? times.push(new Date(f.end_time).getHours())
        : times.push(new Date(f.start_time).getHours())
    );
    times = new Set(times);
    times = Array.from(times).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    times.map((t) => {
      let f = filterdData.filter(
        (d) => d.end_time === null || new Date(d.end_time).getHours() === t
      );

      return gd.push({
        em: f.length,
        time: t.toString(),
      });
    });

    console.log({ gd });
    setGraphData(gd);
  };

  useEffect(() => {
    format(selectedDate);
  }, [data, selectedDate]);

  const config = {
    autoFit: true,
    height: 500,
    data: graphData,

    color: "#82d1de",
    xField: "time",
    yField: "em",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: false,
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ml-auto">
          <div>
            <input
              type="date"
              value={selectedDate}
              className="border border-gray-200 px-2 py-2 rounded-lg outline-none focus:border-blue-500 hover:border-blue-500"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <TimePicker.RangePicker
            onChange={(e) => setTimeRange(e)}
            className="py-2"
          />

          <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 hover:border-blue-500">
            <option value="1h"> 1h </option>
            <option value="2h"> 2h </option>
            <option value="3h"> 3h </option>
            <option value="4h"> 4h </option>
          </select>
        </div>
      </div>

      <Line {...config} />
    </div>
  );
};

export default DemoLine;
