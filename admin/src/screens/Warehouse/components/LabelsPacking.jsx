import React from "react";
import { default as api } from "../components/store/apiSlice";
import { getLabels } from "../components/helper/matirialhelper";
import { Box } from "@mui/material";

export default function LabelsPacking() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetMatirialLabelsQuery();
  let Matirials;

  if (isFetching) {
    Matirials = <div>Fetching</div>;
  } else if (isSuccess) {
    Matirials = getLabels(data, "type").map((v, i) => (
      <LabelPackingComponent key={i} data={v}></LabelPackingComponent>
    ));
  } else if (isError) {
    Matirials = <div>Error</div>;
  }

  return <>{Matirials}</>;
}

function LabelPackingComponent({ data }) {
  if (!data) return <></>;
  return (
    <Box
      sx={{
        bgcolor: "#2F2F3D",
        width: "300px",
        height: "50px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
        boxSizing: "border-box",
        borderRadius: "20px",
        textAlign: "center",
        marginTop: "10px",
      }}
    >
      <div className="labels flex justify-between">
        <div className="flex gap-2">
          <div
            className="w-3 h-12 rounded py-2"
            style={{ background: data.color ?? "#28B463" }}
          ></div>
          <h3
            className=""
            style={{ fontSize: "25px", color: "white", fontFamily: "Arvo" }}
          >
            {data.type ?? ""}
          </h3>
        </div>
        <h3
          className=""
          style={{ fontSize: "25px", color: "white", fontFamily: "Arvo" }}
        >
          {Math.round(data.percent) ?? 0}
        </h3>
      </div>
    </Box>
  );
}
