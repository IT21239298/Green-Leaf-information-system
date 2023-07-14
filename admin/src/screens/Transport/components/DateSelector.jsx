import React, { useEffect, useState } from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "../utils/DatePicker.css";

import { Theme } from "../utils/Theme";

const DateSelector = ({
  selectedDay,
  setSelectedDay,
  palceholder,
  error,
  helperText,
  setError,
  setHelperText,
}) => {
  const [value, setValue] = useState(null);
  const [dispalyValue, setDispalyValue] = useState(null);

  const handleDateChange = (date) => {
    if (date) {
      setError(false);
      setHelperText("");
      setValue(date);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setSelectedDay(
      value
        ? `${value.year}-${
            value.month < 10
              ? "0" + value.month.toString()
              : value.month.toString()
          }-${
            value.day < 10 ? "0" + value.day.toString() : value.day.toString()
          }`
        : ""
    );
  }, [value]);

  useEffect(() => {
    setDispalyValue(selectedDay);
  }, [selectedDay]);

  const renderCustomInput = ({ ref }) => (
    <>
      <input
        readOnly
        ref={ref}
        placeholder={`${palceholder}*`}
        value={dispalyValue ? dispalyValue : ""}
        style={{
          width: "268px",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "14px",
          fontSize: "17px",
          border: `1px solid ${error ? "#D32F2F" : "#9EA3A8"}`,
          borderRadius: "5px",
          outline: "none",
          backgroundColor: Theme.palette.background.secondary,
          color: "white",
        }}
      />
      <p
        style={{
          display: `${helperText ? "" : "none"}`,
          fontSize: "12.5px",
          color: `${error ? "#D32F2F" : "#9EA3A8"}`,
          marginLeft: "15px",
          marginTop: "5px",
        }}
      >
        {helperText}
      </p>
    </>
  );

  return (
    <DatePicker
      value={value}
      onChange={(date) => handleDateChange(date)}
      renderInput={renderCustomInput}
      shouldHighlightWeekends
    />
  );
};

export default DateSelector;
