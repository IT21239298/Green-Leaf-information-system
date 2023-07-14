import _ from "lodash";

export function getSum(quantity, type) {
  let sum = _(quantity)
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
export function getLabels(quantity) {
    let amountSum = getSum(quantity, "type");
    let Total = _.sum(getSum(quantity));
  
    let percent = _(amountSum)
      .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
      .value();
  
    return percent;
  }
