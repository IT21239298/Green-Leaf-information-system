import _ from "lodash";
import { Pie } from "react-chartjs-2";

export function getSum(product, type) {
  let sum = _(product)
    .groupBy("type")

    .map((objs, key) => {
      if (!type) return _.sumBy(objs, "amount"); // [300, 350, 500]
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();
  return sum;
}

export function getLabels(product) {
  let amountSum = getSum(product, "type");
  let Total = _.sum(getSum(product));
  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

export function chart_Data(product, custom) {
  let bg = _.map(product, (a) => a.color);
  bg = _.uniq(bg);
  let dataValue = getSum(product);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,

          backgroundColor: [
            "rgb(138,43,226)",
            "rgb(210,105,30)",
            "rgb(139,0,139)",
            "rgb(199,21,133)",
            "rgb(	255,255,0)",
          ],
        },
      ],
    },
  };

  return custom ?? config;
}

export function getTotal(product) {
  return _.sum(getSum(product));
}
