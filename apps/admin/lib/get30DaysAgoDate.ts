const get30DaysAgoDate = () => {
  const thirtyDaysAgo = new Date();

  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return { thirtyDaysAgo };
};

export { get30DaysAgoDate };
