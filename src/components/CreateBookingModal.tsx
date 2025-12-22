import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import css from "../styles/Modal.module.css";
import GenericModal from "./GenericModal";
import type { Booking, BookingInput } from "../types/Booking";
import { createBookingApi, getAllRoomsApi } from "../services/api";
import { Select } from "./Select";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateBookingModal({ isOpen, setIsOpen }: Props) {
  const [input, setInput] = useState<Partial<BookingInput>>({});
  const queryClient = useQueryClient();

  const { data: rooms = [] } = useQuery({
    queryKey: ["select-rooms", isOpen],
    queryFn: getAllRoomsApi,
    enabled: isOpen,
  });

  const onSuccess = (data: Booking) => {
    queryClient.setQueryData<Booking[]>(["bookings-list"], (prev = []) => [
      ...prev,
      data,
    ]);
    setIsOpen(false);
    setInput({});
  };

  if (!isOpen) return;

  const roomOptions = rooms.map((room) => ({
    label: room.title,
    value: room.id,
  }));

  return (
    <GenericModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSuccess={onSuccess}
      mutationFn={createBookingApi}
      getInput={() => input as Booking}
    >
      {/* Room */}
      <Select
        value={input.roomId ?? undefined}
        options={roomOptions}
        placeholder="Choose room"
        onChange={(roomId) => setInput((prev) => ({ ...prev, roomId }))}
      />

      {/* Start time */}
      <input
        type="datetime-local"
        required
        value={
          input.start ? new Date(input.start).toISOString().slice(0, 16) : ""
        }
        onClick={(e) => {
          const input = e.currentTarget as HTMLInputElement;
          input.showPicker?.();
        }}
        onChange={(e) =>
          setInput((prev) => ({
            ...prev,
            start: new Date(e.target.value).toISOString(),
          }))
        }
      />

      {/* End time */}
      <input
        type="datetime-local"
        required
        value={input.end ? new Date(input.end).toISOString().slice(0, 16) : ""}
        onClick={(e) => {
          const input = e.currentTarget as HTMLInputElement;
          input.showPicker?.();
        }}
        onChange={(e) =>
          setInput((prev) => ({
            ...prev,
            end: new Date(e.target.value).toISOString(),
          }))
        }
      />

      {/* Description */}
      <textarea
        id="description"
        name="description"
        required
        placeholder="description"
        className="textarea-autosize"
        maxLength={5000}
        value={input.description || ""}
        onChange={(e) => setInput({ ...input, description: e.target.value })}
      />
      <button type="submit" className={css.submit_btn}>
        Create
      </button>
    </GenericModal>
  );
}
