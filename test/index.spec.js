import 'babel-polyfill';

import mapState from 'index';

const identity = (value) => value;

describe('mapState', () => {
  const ACTION1 = 'ACTION1';
  const ACTION2 = 'ACTION2';
  const ACTION3 = 'ACTION3';
  const before = (stateBefore) => ([stateBefore]);
  const after = (stateAfter) => stateAfter[0];

  it('maps state before passing to reducer', () => {
    const _mapState = mapState({ before })(identity);

    expect(_mapState(null, {})).toEqual([null]);
  });

  it('maps state returned from reducer', () => {
    const _mapState = mapState({ after })(identity);

    expect(_mapState([null], {})).toEqual(null);
  });

  it('handles specified action types', () => {
    const baseReducer = (state = null, action) => state;
    const _mapState = mapState({
      before,
      actionTypes: [ACTION1, ACTION2],
    })(baseReducer);

    expect(_mapState('initialState', { type: ACTION1 })).toEqual(['initialState']);
    expect(_mapState('initialState', { type: ACTION3 })).toEqual('initialState');
  });
});
