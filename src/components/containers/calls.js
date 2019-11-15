export function isSomethingLoading(loading) {
  //Check if any of the 'loading' flags are true
  const currentLoadingFlag = whatIsLoading(loading);
  //Some flags are not handled in a generic way. The following flags have specific handlers wherever they're used
  return currentLoadingFlag
    && currentLoadingFlag !== "excludedFlag"
    ? true : false;
}

export function whatIsLoading(loading) {
  //Returns the first loading flag that is 'on' if any
  return Object.keys(loading).find((flagName) => loading[flagName]);
}
