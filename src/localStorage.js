export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    return JSON.parse(serializedState) || {};
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
};
