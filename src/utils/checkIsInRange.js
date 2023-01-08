const checkIsInRange = (target, value, margin = 0) => {
  return target >= value - margin && target <= value + margin;
};

export default checkIsInRange;
