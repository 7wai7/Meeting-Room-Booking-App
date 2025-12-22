import type { Booking, BookingInput, BookingWithRoom } from "../types/Booking";
import type { MeetingRoom } from "../types/MeetingRoom";
import { LS, read, write } from "../utils/storage";

export const createBookingRaw = (input: BookingInput) => {
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);
  const bookings: Booking[] = read(LS.BOOKINGS, []);

  const room = rooms.find((r) => r.id === input.roomId);
  if (!room) throw new Error("Room not found");

  const newStart = new Date(input.start).getTime();
  const newEnd = new Date(input.end).getTime();

  if (newEnd <= newStart) throw new Error("End time must be after start time");

  // Перевірка на конфлікт часу
  const hasConflict = bookings.some((b) => {
    if (b.roomId !== input.roomId) return false;
    const start = new Date(b.start).getTime();
    const end = new Date(b.end).getTime();
    // Перетин інтервалів: [newStart, newEnd] vs [start, end]
    return newStart < end && newEnd > start;
  });

  if (hasConflict) throw new Error("Time conflict with existing booking");

  const newBooking: Booking = {
    id: crypto.randomUUID(),
    ...input,
  };

  write(LS.BOOKINGS, [...bookings, newBooking]);

  return {
    ...newBooking,
    room,
  };
};


export const getAllBookingsRaw = () => {
  const rooms: MeetingRoom[] = read(LS.ROOMS, []);
  const bookings: Booking[] = read(LS.BOOKINGS, []);

  const result: BookingWithRoom[] = [];
  for (const booking of bookings) {
    const room = rooms.find((r) => r.id == booking.roomId);
    if (room)
      result.push({
        ...booking,
        room,
      });
  }

  return result;
};

export const getBookingsByRoomIdRaw = (id: string) => {
  const bookings: Booking[] = read(LS.BOOKINGS, []);
  return bookings.filter((booking) => booking.roomId === id);
};

export const deleteBookingRaw = (id: string) => {
  const bookings: Booking[] = read(LS.BOOKINGS, []);
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) throw new Error("Not found");
  const deleted = bookings[index];
  bookings.splice(index, 1);
  write(LS.BOOKINGS, bookings);
  return deleted;
};
