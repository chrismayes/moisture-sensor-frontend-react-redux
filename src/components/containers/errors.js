export function checkForErrors(state, action) {
  if(action.errors) {
    let newErrors = status.errors || [];
    newErrors.push(action.errors);
    return {
      ...state,
      errors: newErrors
    };
  } else return undefined;
}
