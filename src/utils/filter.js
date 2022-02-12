import {FilterType} from '../const';
import { isDateExpired, isDateCurrent, isEventContinues, isDateInFuture } from './date.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter(() => points.length),
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateInFuture(point.dueFrom) || isDateCurrent(point.dueTo) && isEventContinues(point.dueFrom, point.dueTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isDateExpired(point.dueTo) || isEventContinues(point.dueFrom, point.dueTo)),
};
