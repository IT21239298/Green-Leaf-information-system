import React from "react";
import "../screen/App.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Title } from "chart.js";
import { chart_Data, getTotal } from "../components/helper/finalhelper";
import { default as api } from "./store/apiSlice";

Chart.register(ArcElement);

const total = {
  color: "#000000 ",
  fontSize: "40px",
  fontFamily: "Arvo",
};
const totalam = {
  color: "#14EDBD",
  fontSize: "29px",
  fontFamily: "Arvo",
};
export default function GraphFinal() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetProductLabelsQuery();
  let graphData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Pie {...chart_Data(data)}></Pie>;
  } else if (isError) {
    graphData = <div>Error</div>;
  }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}

          <h3 className="mb-4 font-bold title" style={total}>
            Total
            <span className="block " style={totalam}>
              {getTotal(data) ?? 0} kg
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
