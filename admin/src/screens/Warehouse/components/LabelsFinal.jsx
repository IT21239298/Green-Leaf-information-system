import React from "react";
import { default as api } from "../components/store/apiSlice";
import { getLabels } from "../components/helper/finalhelper";
import { Box } from "@mui/material";

export default function LabelsFinal() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetProductLabelsQuery();
  let Products;

  if (isFetching) {
    Products = <div>Fetching</div>;
  } else if (isSuccess) {
    Products = getLabels(data, "type").map((v, i) => (
      <LabelProductComponent key={i} data={v}></LabelProductComponent>
    ));
  } else if (isError) {
    Products = <div>Error</div>;
  }

  return <>{Products}</>;
}

function LabelProductComponent({ data }) {
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
          {Math.round(data.percent) ?? 0}%
        </h3>
      </div>
    </Box>
  );
}
