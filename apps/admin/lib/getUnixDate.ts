const getUnixTimestamps = () => {
  const now = Date.now();

  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const nowTimestamp = Math.floor(now / 1000);
  const thirtyDaysAgoTimestamp = Math.floor(thirtyDaysAgo / 1000);

  return { thirtyDaysAgoTimestamp, nowTimestamp };
};

export { getUnixTimestamps };
