
const pointToFilterMap = {
  everything: (points) => points.filter((point) => !point.isArchive).length,
  future: (points) => points
    .filter((point) => !point.isFavorite),
  past: (points) => points
    .filter((point) => !point.isFavorite)
};

export const generateFilter = (points) => Object.entries(pointToFilterMap).map(([filterName, counts]) => ({
  name: filterName,
  count: counts(points),
}));
