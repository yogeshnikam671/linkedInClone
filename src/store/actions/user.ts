import { createAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../api/profile/fetchProfile";

export const storeUserDetails = createAction("storeUser", (user: UserProfile) => {
    return { payload: user };
});
