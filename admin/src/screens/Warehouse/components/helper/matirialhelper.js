import _ from "lodash";

export function getSum(matirial, type) {
  let sum = _(matirial)
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

export function getLabels(matirial) {
  let amountSum = getSum(matirial, "type");

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: objs.total }))
    .value();

  return percent;
}

export function chart_Data(matirial, custom) {
  let bg = _.map(matirial, (a) => a.color);
  bg = _.uniq(bg);
  let dataValue = getSum(matirial);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
          backgroundColor: ["rgb(138,43,226)", "rgb(210,105,30)"],
        },
      ],
    },
    options: {
      cutout: 110,
    },
  };

  return custom ?? config;
}

export function getTotal(matirial) {
  return _.sum(getSum(matirial));
}
