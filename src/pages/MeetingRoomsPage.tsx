import { useCallback, useState } from "react";
import CreateRoomModal from "../components/CreateRoomModal";
import css from "../styles/MeetingRoomsPage.module.css";
import { RoomsList } from "../components/RoomsList";
import type { MeetingRoom } from "../types/MeetingRoom";

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
  return (
    <dl className={css.details}>
      <dt>Title</dt>
      <dd className={css.title}>{r.title}</dd>

      <dt>Description</dt>
      <dd className={css.description}>{r.description}</dd>

      <hr/>

      <dt>Owner</dt>
      <dd className={css.owner}>-</dd>

      <dt>Bookings</dt>
      <dd className={css.bookings}>-</dd>
    </dl>
  );
}
