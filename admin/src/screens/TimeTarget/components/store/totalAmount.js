import _ from "lodash";

export function getSum(time, type) {
  let sum = _(time)
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
export function getLabels(time) {
    let amountSum = getSum(time, "type");
    let Total = _.sum(getSum(time));
  
    let percent = _(amountSum)
      .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
      .value();
  
    return percent;
  }
