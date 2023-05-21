import { createAction } from "@reduxjs/toolkit";

export const storeLoginDetails = createAction("login", (authToken) => {
    return { payload: {authToken}};
});
