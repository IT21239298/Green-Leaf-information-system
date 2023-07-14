import React, { useState } from "react";
import "boxicons";
import { default as api } from "./store/apiSlice";
import { Box, Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditPacking from "./EditPacking";
import ReleasePacking from "./RealesePacking";
export default function ListPacking() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetMatirialLabelsQuery();
  const [deleteMatirial] = api.useDeleteMatirialMutation();

  let Matirials;

  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteMatirial({ _id: e.target.dataset.id });
  };

  if (isFetching) {
    Matirials = <div>Fetching</div>;
  } else if (isSuccess) {
    Matirials = data.map((v, i) => (
      <Matirial
        key={i}
        matirialcategories={v}
        handler={handlerClick}
      ></Matirial>
    ));
  } else if (isError) {
    Matirials = <div>Error</div>;
  }

  return <div className="flex flex-col py-6 gap-3">{Matirials}</div>;
}

function Matirial({ matirialcategories, handler }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openDialoga, setOpenDialoga] = useState(false);
  const [isEditOpena, setIsEditOpena] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
    setIsEditOpen(true);
  };

  const handleOpena = () => {
    setOpenDialoga(true);
    setIsEditOpena(true);
  };
  if (!matirialcategories) return null;
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

        fontSize: "20px",
        color: "white",
        fontFamily: "Arvo",
      }}
    >
      <div
        className="item flex justify-center bg-100 py-2 rounded-r"
        style={{
          borderRight: `26px solid ${matirialcategories.color ?? "#28B463"}`,
          borderRadius: "25px",
        }}
      >
        <button className="px-3" onClick={handler}>
          <box-icon
            data-id={matirialcategories._id ?? ""}
            color={matirialcategories.color ?? "#F90505"}
            size="30px"
            name="trash"
          ></box-icon>
        </button>

        <Button
          variant="contained"
          color="success"
          sx={{
            mt: 1,
            mb: 1,
            bgcolor: "green",
            width: "200px",
          }}
          onClick={handleOpen}
        >
          RELEASED
        </Button>
        <EditPacking
          open={openDialog}
          setOpen={setOpenDialog}
          matirialData={matirialcategories}
        />
        <span className="block w-full">{matirialcategories.date ?? ""}</span>
        <span className="block w-full">{matirialcategories.type ?? ""}</span>
        <span className="block w-full">{matirialcategories.amount ?? ""}</span>
      </div>
    </Box>
  );
}
