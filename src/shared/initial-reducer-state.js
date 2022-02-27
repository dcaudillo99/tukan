import RequestStatus from "./enum/request-status.enum";

const InitialReducerState = Object.seal({
  status: RequestStatus.Idle,
  error: null
});

export default InitialReducerState;