import type { MeetingRoom, MeetingRoomInput } from "../types/MeetingRoom";
import { delay } from "../utils/delay";
import { LS, read, write } from "../utils/storage";

export const createRoomApi = async (input: MeetingRoomInput) => {
  await delay();
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);

  const newRoom: MeetingRoom = {
    id: crypto.randomUUID(),
    ...input,
  };

  write(LS.ROOMS, [...rooms, newRoom]);
  return newRoom;
};

export const getAllRoomsApi = async (): Promise<MeetingRoom[]> => {
  await delay();
  return read(LS.ROOMS, []);
};
