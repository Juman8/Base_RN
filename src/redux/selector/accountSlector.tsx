import {RootState} from "../rootReducer";

export const getProfileUserfromStore = (state: RootState) => state.accountSlice.userProfile;
export const getTokenUserFromStore = (state: RootState) => state.accountSlice.token;
