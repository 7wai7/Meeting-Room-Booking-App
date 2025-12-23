import type { MeetingRoom } from "./MeetingRoom";

export type BookingInput = {
  roomId: string;
  date: string;
  start: string;
  end: string;
  description: string;
};

export type Booking = {
  id: string;
} & BookingInput;

export type BookingWithRoom = {
  room: MeetingRoom;
} & Booking;

export type UpdateBookingInput = Partial<BookingInput>;
