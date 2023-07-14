import React from "react";
import { Popover, Steps, ConfigProvider } from "antd";

import { Theme } from "../../utils/Theme";

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const Step = ({ items }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Steps: {
            colorText: `${Theme.palette.text.secondary}`,
          },
        },
      }}
    >
      <div>
        <Steps
          direction="vertical"
          size="small"
          current={4}
          progressDot={customDot}
          items={items}
        />
      </div>
    </ConfigProvider>
  );
};

export default Step;
