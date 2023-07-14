import React from "react";
import "boxicons";
import { default as api } from "./store/apiSlice";
import { Box } from "@mui/material";

export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transactions;

  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteTransaction({ _id: e.target.dataset.id });
  };

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v} handler={handlerClick}></Transaction>
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return <div className="flex flex-col py-6 gap-3">{Transactions}</div>;
}

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <Box
      sx={{
        bgcolor: "#2F2F3D",
        width: "800px",
        height: "60px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
        boxSizing: "border-box",
        borderRadius: "25px",
        textAlign: "center",
        marginLeft: "120px",
        fontSize: "20px",
        color: "white",
        fontFamily: "Arvo",
      }}
    >
      <div
        className="label flex justify-center bg-200 py-2"
        style={{
          borderRight: `25px solid ${category.color ?? "#28B463"}`,
          borderRadius: "24px",
        }}
      >
        <button className="px-3" onClick={handler}>
          <box-icon
            data-id={category._id ?? ""}
            color={category.color ?? "#F90505"}
            size="30px"
            name="trash"
          ></box-icon>
        </button>
        <span className="block w-full">{category.name ?? ""}</span>
        <span className="block w-full">{category.amount ?? ""} kg</span>
        <span className="block w-full">{category.type ?? ""}</span>
      </div>
    </Box>
  );
}
