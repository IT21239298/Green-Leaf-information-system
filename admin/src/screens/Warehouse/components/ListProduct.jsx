import React, { useState } from "react";
import "boxicons";
import { default as api } from "./store/apiSlice";
import { Box, Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditProduct from "./EditProduct";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Image from "../assets/img/logo.png";

export default function ListProduct() {
  const [pdfData, setPdfData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { data, isFetching, isSuccess, isError } =
    api.useGetProductLabelsQuery();
  const [deleteProduct] = api.useDeleteProductMutation();

  let Products;

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const tableData = pdfData.length
      ? pdfData
      : filteredData.length
      ? filteredData
      : data;

    const tableColumns = ["Type", "Amount", "Grade", "Date"];
    const tableRows = tableData.map((v) => [v.type, v.amount, v.grade, v.date]);

    const logoData = Image;
    doc.addImage(logoData, "PNG", 25, 10, 150, 10);

    doc.autoTable({
      headStyles: {
        fillColor: [19, 77, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      head: [tableColumns],
      body: tableRows,
      startY: 40,
    });
    doc.setFontSize(20);
    doc.setFont("Arvo", "bold");
    doc.text("FINAL PRODUCT DETAIL REPORT", 40, 30);
    doc.save("FinalProduct_report.pdf");
  };

  const handleAddToPdfData = (quantity) => {
    setPdfData([...pdfData, quantity]);
  };
  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteProduct({ _id: e.target.dataset.id });
  };

  if (isFetching) {
    Products = <div>Fetching</div>;
  } else if (isSuccess) {
    Products = data.map((v, i) => (
      <Product key={i} productcategories={v} handler={handlerClick}></Product>
    ));
  } else if (isError) {
    Products = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      {Products}
      <Button
        color="success"
        variant="contained"
        sx={{
          mt: 2,
          mb: 1,
          bgcolor: "green",
          width: "200px",
          marginLeft: "330px",
        }}
        onClick={handleDownloadPdf}
      >
        Generate Report
      </Button>
    </div>
  );
}

function Product({ productcategories, handler }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
    setIsEditOpen(true);
  };

  if (!productcategories) return null;
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
          borderRight: `25px solid ${productcategories.color ?? "#28B463"}`,
          borderRadius: "25px",
        }}
      >
        <button className="px-3" onClick={handler}>
          <box-icon
            data-id={productcategories._id ?? ""}
            color={productcategories.color ?? "#F90505"}
            size="30px"
            name="trash"
          ></box-icon>
        </button>

        <Button
          text="Edit"
          variant="outlined"
          style={{ color: "green" }}
          onClick={handleOpen}
          startIcon={<BorderColorIcon />}
          sx={{
            mt: 1,
            mb: 1,
            borderColor: "green",
            "&:hover": { borderColor: "green" },
          }}
        />
        <EditProduct
          open={openDialog}
          setOpen={setOpenDialog}
          productData={productcategories}
        />

        <span className="block w-full">{productcategories.type ?? ""}</span>
        <span className="block w-full">
          {productcategories.amount ?? ""} kg
        </span>
        <span className="block w-full">{productcategories.grade ?? ""}</span>
        <span className="block w-full">{productcategories.date ?? ""}</span>
      </div>
    </Box>
  );
}
