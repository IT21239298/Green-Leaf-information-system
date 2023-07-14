import { toast } from "react-hot-toast";

const Toast = (variant, message) => {
  const options = {
    style: {
      borderRadius: "10px",
      color: "#fff",
    },
  };

  if (variant === "success") {
    options.style.background = "#61D345";
  } else if (variant === "error") {
    options.style.background = "#FF4B4B";
  }

  return toast(message, options);
};

export { Toast };
