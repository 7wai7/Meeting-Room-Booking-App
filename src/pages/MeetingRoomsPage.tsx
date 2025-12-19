import { useState } from "react";
import CreateRoomModal from "../components/CreateRoomModal";
import css from "../styles/MeetingRoomsPage.module.css";

export default function MeetingRoomsPage() {
  const [isOpenModal, setIsOpenModal] = useState(true);

  return (
    <>
      <h1 className={css.header}>Meeting rooms</h1>
      <button
        className={css.create_room_btn}
        onClick={() => setIsOpenModal(true)}
      >
        Create room
      </button>
      {/* TODO: add rooms list */}
      <CreateRoomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
}
