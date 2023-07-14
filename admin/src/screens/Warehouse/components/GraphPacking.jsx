import React from "react";
import "../screen/App.css";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { chart_Data, getTotal } from "../components/helper/matirialhelper";
import { default as api } from "./store/apiSlice";

Chart.register(ArcElement);

export default function GraphPacking() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetMatirialLabelsQuery();
  let graphData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Doughnut {...chart_Data(data)}></Doughnut>;
  } else if (isError) {
    graphData = <div>Error</div>;
  }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}
          <h3
            className="mb-4 font-bold title"
            style={{ fontSize: "40px", color: "white", fontFamily: "Arvo" }}
          >
            Total
            <span className="block text-3xl text-emerald-400">
              {getTotal(data) ?? 0}
            </span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4"></div>
      </div>
    </div>
  );
}
