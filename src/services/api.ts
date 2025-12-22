import { delay } from "../utils/delay";

import * as authRaw from "./auth.raw";
import * as roomRaw from "./room.raw";
import * as bookingRaw from "./bookings.raw";

// обгортка з delay
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withDelay = <T extends (...args: any[]) => any>(fn: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    await delay();
    return fn(...args);
  };
};

// AUTH
export const registerApi = withDelay(authRaw.registerRaw);
export const loginApi = withDelay(authRaw.loginRaw);
export const meApi = withDelay(authRaw.meRaw);
export const logoutApi = withDelay(authRaw.logoutRaw);

// ROOMS
export const createRoomApi = withDelay(roomRaw.createRoomRaw);
export const getAllRoomsApi = withDelay(roomRaw.getAllRoomsRaw);
export const updateRoomApi = withDelay(roomRaw.updateRoomRaw);

// BOOKINGS
export const createBookingApi = withDelay(bookingRaw.createBookingRaw);
export const getAllBookingsApi = withDelay(bookingRaw.getAllBookingsRaw);
export const getBookingsByRoomId = withDelay(bookingRaw.getBookingsByRoomIdRaw);
export const deleteBookingApi = withDelay(bookingRaw.deleteBookingRaw);
