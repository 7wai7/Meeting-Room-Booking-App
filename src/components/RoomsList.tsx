import { useQuery } from "@tanstack/react-query";
import css from "../styles/RoomsList.module.css";
import type { MeetingRoom } from "../types/MeetingRoom";
import { getAllRoomsApi } from "../services/room.api";
import clsx from "clsx";
import { memo } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  onSelectRoom?: (r: MeetingRoom) => void;
}

export const RoomsList = memo(function ({ onSelectRoom }: Props) {
  const {
    data: rooms = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms-list"],
    queryFn: getAllRoomsApi,
  });

  return (
    <section className={css.list}>
      <div className={clsx(css.grid, css.list_header)}>
        <p>Title</p>
        <p>Description</p>
      </div>
      <hr />
      {rooms.map((r) => (
        <RoomItem key={r.id} r={r} onClick={() => onSelectRoom?.(r)} />
      ))}
      {isLoading && (
        <LoadingSpinner
          size={3}
          className={css.loading_spinner}
          description="none"
        />
      )}
      {error && <span>{error.message}</span>}
    </section>
  );
});

interface RoomItemProps {
  r: MeetingRoom;
  onClick?: () => void;
}

function RoomItem({ r, onClick }: RoomItemProps) {
  return (
    <div className={clsx(css.room_item, css.grid)} onClick={onClick}>
      <h3 className={css.title}>{r.title}</h3>
      <p className={css.description}>{r.description}</p>
    </div>
  );
}
