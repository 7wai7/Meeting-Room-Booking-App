import type {
  MeetingRoom,
  MeetingRoomInput,
  UpdateMeetingRoomInput,
} from "../types/MeetingRoom";
import { LS, read, write } from "../utils/storage";
import {
  ValidationError,
  type ValidationErrors,
} from "../utils/ValidationError";
import { getBookingsByRoomIdRaw } from "./bookings.raw";

export const createRoomRaw = (input: MeetingRoomInput) => {
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);

  const newRoom: MeetingRoom = {
    id: crypto.randomUUID(),
    ...input,
  };

  write(LS.ROOMS, [...rooms, newRoom]);
  return newRoom;
};

export const getAllRoomsRaw = () => {
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);
  for (const r of rooms) r.bookingsCount = getBookingsByRoomIdRaw(r.id).length;
  return rooms;
};

export const updateRoomRaw = ({
  id,
  input,
}: {
  id: string;
  input: UpdateMeetingRoomInput;
}) => {
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);
  const index = rooms.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Room not found");

  const room = rooms[index];
  const newRoom = { ...room, ...input };

  const fields: ValidationErrors = {};
  if (!newRoom.title?.trim()) fields.title = { message: "Title is required" };
  if (!newRoom.description?.trim())
    fields.description = { message: "Description is required" };
  if (Object.entries(fields).length) throw new ValidationError(fields);

  rooms[index] = newRoom;

  write(LS.ROOMS, rooms);
  return newRoom;
};
