import { handleActions } from 'redux-actions';
import { StateType } from '../types/state-utils';

export const universeReducerName = 'redux-universe';

const actionTypes = {
  create: `${universeReducerName}.create-dynamic-state`,
  replace: `${universeReducerName}.replace-dynamic-state`,
  merge: `${universeReducerName}.merge-dynamic-state`,
};


const createStore = {
  next(state: StateType, action: CreateActionType) {
    return { ...state, [action.name]: action.initialState };
  },
};

const replaceStore = {
  next(state: StateType, action: UpdateActionType) {
    return { ...state, [action.name]: action.data };
  },
};
const mergeStore = {
  next(state: StateType, action: UpdateActionType) {
    return { ...state, [action.name]: { ...state[action.name], ...action.data } };
  },
};

const reducerMap = {
  [actionTypes.create]: createStore,
  [actionTypes.replace]: replaceStore,
  [actionTypes.merge]: mergeStore,
};

export default handleActions(reducerMap, {});
