import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import AutoResizeTextarea from "../components/AutoResizeTextarea";
import CreateRoomModal from "../components/CreateRoomModal";
import { RoomsList } from "../components/RoomsList";
import { useInlineEdit } from "../hooks/useInlineEdit";
import css from "../styles/MeetingRoomsPage.module.css";
import type { MeetingRoom, UpdateMeetingRoomInput } from "../types/MeetingRoom";
import { ValidationError } from "../utils/ValidationError";
import { updateRoomApi } from "../services/api";

export default function MeetingRoomsPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<MeetingRoom | null>(null);

  const onSelectRoom = useCallback((r: MeetingRoom) => setSelectedRoom(r), []);

  return (
    <>
      <h1 className={css.header}>Meeting rooms</h1>
      <button
        className={css.create_room_btn}
        onClick={() => setIsOpenModal(true)}
      >
        Create room
      </button>
      <div className={css.rooms_list_section}>
        <RoomsList onSelectRoom={onSelectRoom} />
        <section className={css.about_room}>
          {selectedRoom ? (
            <RoomDetails r={selectedRoom} />
          ) : (
            <p className={css.placeholder}>Select room to view details.</p>
          )}
        </section>
      </div>
      <CreateRoomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
}

interface RoomDetailsProps {
  r: MeetingRoom;
}

function RoomDetails({ r }: RoomDetailsProps) {
  const queryClient = useQueryClient();

  const {
    mutate: updateRoom,
    error,
    reset,
  } = useMutation<
    MeetingRoom,
    ValidationError | Error,
    { id: string; input: UpdateMeetingRoomInput }
  >({
    mutationFn: updateRoomApi,
    onSuccess: (updatedRoom) => {
      queryClient.setQueryData<MeetingRoom[]>(["rooms-list"], (rooms = []) =>
        rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room))
      );
    },
    onError: (error) => {
      if (error instanceof ValidationError) {
        // повернути значення назад при помилці
        if (error?.fields.title) titleEdit.setValue(r.title);
        if (error?.fields.description) descriptionEdit.setValue(r.description);
      }
    },
  });

  const titleEdit = useInlineEdit({
    value: r.title,
    onSave: (title) => {
      reset();
      updateRoom({ id: r.id, input: { title } });
    },
  });

  const descriptionEdit = useInlineEdit({
    value: r.description,
    onSave: (description) => {
      reset();
      updateRoom({ id: r.id, input: { description } });
    },
  });

  useEffect(() => {
    reset();
  }, [r, reset]);

  return (
    <dl className={css.details}>
      <dt>Title</dt>
      <input
        className={
          error instanceof ValidationError && error?.fields.title
            ? css.field_error
            : ""
        }
        maxLength={32}
        value={titleEdit.value}
        onChange={(e) => titleEdit.onChange(e.target.value)}
        onBlur={titleEdit.onBlur}
        onKeyDown={titleEdit.onKeyDown}
      />

      {error instanceof ValidationError && error?.fields.title && (
        <p className={css.error_message}>{error.fields.title?.message}</p>
      )}

      <dt>Description</dt>
      <AutoResizeTextarea
        className={
          error instanceof ValidationError && error?.fields.description
            ? css.field_error
            : ""
        }
        maxLength={5000}
        value={descriptionEdit.value}
        onChange={(e) => descriptionEdit.onChange(e.target.value)}
        onBlur={descriptionEdit.onBlur}
        onKeyDown={descriptionEdit.onKeyDown}
      />

      {error instanceof ValidationError && error?.fields.description && (
        <p className={css.error_message}>{error.fields.description?.message}</p>
      )}

      <hr />

      <dt>Owner</dt>
      <dd className={css.owner}>-</dd>

      <dt>Bookings</dt>
      <dd className={css.bookings}>{r.bookingsCount ?? "-"}</dd>
    </dl>
  );
}
