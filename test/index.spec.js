import 'babel-polyfill';

import mapState from 'index';

const identity = (value) => value;

describe('mapState', () => {
  const ACTION = 'ACTION';
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
    const baseReducer = (state = null, action) => action.type === ACTION ? 'newState' : state;
    const _mapState = mapState({ actionTypes: [ACTION] })(baseReducer);

    expect(_mapState('initialState', { type: ACTION })).toBe('newState');
    expect(_mapState('initialState', { type: 'action2' })).toBe('initialState');
  });
});
