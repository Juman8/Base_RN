import {baseApi} from "./api";

export const rootMiddle = (getDefaultMiddleware: any) => getDefaultMiddleware().concat(baseApi.middleware)