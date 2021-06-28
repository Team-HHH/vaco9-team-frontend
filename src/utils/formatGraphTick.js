const formatGraphTick = (tick) => {
  if (tick > 1000000000) {
    return Math.round(tick / 100000000) / 10 + 'Bn';
  } else if (tick > 1000000) {
    return Math.round(tick / 100000) / 10 + 'M';
  } else {
    return Math.round(tick / 100) / 10 + 'K';
  }
};

export default formatGraphTick;
