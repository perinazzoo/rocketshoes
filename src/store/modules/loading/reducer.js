import produce from 'immer';

export default function loading(state = false, action) {
  switch (action.type) {
    case '@loading/UPDATE_STATUS':
      return produce(state, draft => {
        draft = action.loading;

        return draft;
      });
    default:
      return state;
  }
}
