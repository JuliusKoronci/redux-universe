import { Map } from 'immutable';
import { ImmutableObject } from 'seamless-immutable';

type BaseStateType = { [key: string]: any };
type ImmutableMap = Map<object, any>;
type SeamlessMap = ImmutableObject<any>;
type StateType = BaseStateType | ImmutableMap | SeamlessMap;
