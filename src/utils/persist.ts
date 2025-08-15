import { RootState } from "src/store/configureStore";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    } else if (typeof serializedState === 'object') {
      return serializedState
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.error(e);
  }
};
