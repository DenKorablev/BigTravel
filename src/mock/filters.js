import { isDateExpired, isDateCurrent, isEventContinues, isDateInFuture } from '../util.js';

const pointToFilterMap = {
  everything: (points) => points.length,
  future: (points) =>
    points.filter((point) => isDateInFuture(point.dueFrom)).length +
    points.filter((point) => isDateCurrent(point.dueTo)).length +
    points.filter((point) => isEventContinues(point.dueFrom, point.dueTo)).length,
  past: (points) =>
    points.filter((point) => isDateExpired(point.dueTo)).length +
    points.filter((point) => isEventContinues(point.dueFrom, point.dueTo)).length,
};

export const generateFilter = (points) => Object.entries(pointToFilterMap).map(([filterName, counts]) => ({
  name: filterName,
  count: counts(points),
}));

