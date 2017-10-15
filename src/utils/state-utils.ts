import { Iterable, Map } from 'immutable';
import { StateType, ImmutableMap, SeamlessMap } from '../types/state-utils';

const isImmutableJs = (obj: Object | ImmutableMap) => Iterable.isIterable(obj);

const isSeamlessImmutable = (obj: Object | SeamlessMap) =>
  typeof obj.asMutable === 'function';

const mergeImmutableJs = (state: ImmutableMap, obj: Object) => state.mergeDeep(obj);

const mergeSeamlessImmutable = (state: SeamlessMap, obj: Object) =>
  state.merge(obj, { deep: true });
/**
 * Use this function to conver an immutable state to na regular object
 *
 * @param {Object} state
 */
export const getCleanState = (state: StateType) => {
  // we check for immutable.js
  if (isImmutableJs(state)) {
    return state.toJS();
  }
  // we check for seamless immutable
  if (isSeamlessImmutable(state)) {
    return state.asMutable({ deep: true });
  }
  return state;
};

/**
 * Return a merged object - by default it uses the ImmutableJs library
 *
 * @param {Object} state
 * @param {Object} toMerge
 *
 * @returns {Map} - merged state
 */
export const mergeState = (state: StateType, toMerge: Object): Object => {
  if (isImmutableJs(state)) {
    return mergeImmutableJs(state, toMerge);
  }
  if (isSeamlessImmutable(state)) {
    return mergeSeamlessImmutable(state, toMerge);
  }

  return mergeImmutableJs(Map(state), toMerge).toJS();
};
