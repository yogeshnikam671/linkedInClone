import { Action } from "./authReducer"

const initialState = {
  profile: undefined
}

export const userReducer = (state = initialState, action: Action) => {
  switch(action.type) {
    case 'storeUser': return {...state, profile: action?.payload};
    default: return state;
  }
}
