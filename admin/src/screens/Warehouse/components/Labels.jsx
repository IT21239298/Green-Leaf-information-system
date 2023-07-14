import React from "react";
import { default as api } from "./store/apiSlice";
import { getLabels } from "./helper/helper";
import { Box } from "@mui/material";
export default function Labels() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = getLabels(data, "type").map((v, i) => {
      <LabelComponent key={i} data={v}></LabelComponent>;
    });
  } else if (isError) {
    Transactions = <div>Error</div>;
  }
  console.log(Transactions);
  return <>{Transactions}</>;
}

function LabelComponent({ data }) {
  if (!data) return <></>;
  return (
    <Box
      sx={{
        bgcolor: "#2F2F3D",
        width: "300px",
        height: "52px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
        boxSizing: "border-box",
        borderRadius: "20px",
        textAlign: "center",
        marginTop: "10px",

        fontSize: "25px",
        color: "white",
        fontFamily: "Arvo",
      }}
    >
      <div className="labels flex justify-between">
        <div className="flex gap-2">
          <div
            className="w-2 h-2 rounded py-3"
            style={{ background: data.color ?? "#f9c74f" }}
          ></div>
          <h3 className="text-md">{data.type ?? ""}</h3>
        </div>
        <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
      </div>
    </Box>
  );
}
