
// TODO - move this to somewhere else
interface Action {
  type: string,
  payload: any
}

const initialState = {
  authToken: undefined
}

export const authReducer = (state = initialState, action: Action) => {
  switch(action.type) {
    case 'login': return {...state, authToken: action?.payload?.authToken };
    default: return state;
  }
}

