export default function clippingsReducer(state, action) {
  switch (action.type) {
    case 'CREATE_CLIPPING':
      return [action.payload, ...state];

    case 'UPDATE_CLIPPING':
      return state.map((clipping) =>
        clipping._id === action.payload._id ? action.payload : clipping,
      );

    case 'DELETE_CLIPPING':
      const clippingIndex = state.findIndex(
        (clipping) => clipping._id === action.payload,
      );
      return [
        ...state.slice(0, clippingIndex),
        ...state.slice(clippingIndex + 1),
      ];

    case 'LIST_CLIPPING':
      return action.payload;

    default:
      return state;
  }
}
