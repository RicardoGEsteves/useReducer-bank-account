import { initialState } from "./App";
const OPEN_ACCOUNT_VALUE = 500;

export function reducer(state, action) {
  // openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount

  if (!state.isActive && action.type !== "openAccount") return state;
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: OPEN_ACCOUNT_VALUE,
        isActive: !state.isActive,
      };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      // think about if the balance is at 0, it should be disabled the button
      return {
        ...state,
        balance: state.balance - action.payload,
        // isActive: state.balance < 50 ? !state.isActive : state.isActive,
      };
    case "requestLoan":
      // if (state.loan !== initialState.loan) return state
      if (state.loan !== 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: action.payload,

        // it should have a message saying that , you can just request one loan until you pay the prev loan
      };
    case "payLoan":
      if (state.loan === 0 || state.balance < state.loan) return state;
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,

        //if balance less than loan display message saying there is not enough money in account
      };
    case "closeAccount":
      if (state.loan !== 0 || state.balance !== 0) return state;
      return {
        initialState,
      };
    default:
      throw new Error("Action unknown");
  }
}
