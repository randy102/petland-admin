interface GlobalState {
  userInfo: {},
  configs: {}
}

const reducer = (state: GlobalState, action: any) => {
  switch (action.type) {
    case "SAVE_USER_INFO":
      return {
        ...state,
        userInfo: action.payload
      };
    case "SAVE_CONFIGS":
      return {
        ...state,
        configs: action.payload
      };
    default:
      throw new Error();
  }
};

export default reducer