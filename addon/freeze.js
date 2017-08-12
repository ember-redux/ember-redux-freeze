import deepFreeze from './deepFreeze';

// https://github.com/buunguyen/redux-freeze/blob/master/src/middleware.js
export default function freeze(store) {
  return next => action => {
    freezeStoreState(store);
    try {
      return next(action);
    }
    finally {
      freezeStoreState(store);
    }
  }
}

function freezeStoreState(store) {
  const state = store.getState();
  if (isFreezable(state)) {
    deepFreeze(state);
  }
}

function isFreezable(value) {
  return value !== null && typeof value === 'object';
}
