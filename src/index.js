const identity = (value) => value;

const nullReducer = (state) => typeof state === 'undefined' ? null : state;

/**
 * Creates a reducer wrapper which maps state before and after passing to a
 * reducer, but does it only for passed action types.
 * @param {object} options
 * @param {function} [options.before=identity]
 *   A function with signature: (stateBefore) => newStateBefore, where
 *   stateBefore is the original state, newStateBefore is passed to the reducer.
 * @param {function} [options.after=identity]
 *   A function with signature: (stateAfter) => newStateAfter, where
 *   stateAfter is returned by the reducer, newStateAfter is returned to the store.
 * @param {string[]} [options.actionTypes]
 *   Action types to perform map state. Handles all actions if not provided.
 * @returns {function} a function of signature (reducer) => newReducer
 */
const withMapStateReducer = ({
  before = identity,
  after = identity,
  actionTypes = null,
}) => {
  const actionTypesDict = actionTypes && actionTypes.reduce(
    (dict, actionType) => ({ ...dict, [actionType]: true }), {}
  );

  return (reducer = nullReducer) => (state, action) => {
    if (actionTypes && !actionTypesDict[action.type]) {
      return reducer(state, action);
    }

    return after(reducer(before(state), action));
  };
};

export default withMapStateReducer;
