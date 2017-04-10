export default function({dispatch}) {
  return next => action => {

    if (!action.payload || !action.payload.then) {
      // This middleware is for handing ajax-promises, so leave others.
      return next(action);
    }

    action.payload.then(response => {
      const newAction = {...action, payload: response};
      dispatch(newAction);
    });
  };
}
