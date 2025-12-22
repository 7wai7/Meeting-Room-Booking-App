import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import css from "../styles/Modal.module.css";
import type { MeetingRoom, MeetingRoomInput } from "../types/MeetingRoom";
import GenericModal from "./GenericModal";
import { createRoomApi } from "../services/api";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRoomModal({ isOpen, setIsOpen }: Props) {
  const [input, setInput] = useState<Partial<MeetingRoomInput>>({});
  const queryClient = useQueryClient();

  const onSuccess = (data: MeetingRoom) => {
    queryClient.setQueryData<MeetingRoom[]>(["rooms-list"], (prev = []) => [
      ...prev,
      data,
    ]);
    setIsOpen(false);
    setInput({});
  };

  if (!isOpen) return;

  return (
    <GenericModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSuccess={onSuccess}
      mutationFn={createRoomApi}
      getInput={() => input as MeetingRoom}
    >
      <input
        type="text"
        id="title"
        name="title"
        required
        placeholder="title"
        maxLength={32}
        value={input.title || ""}
        onChange={(e) => setInput({ ...input, title: e.target.value })}
      />
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
      <button
        type="submit"
        className={css.submit_btn}
        disabled={!(input.title?.trim() && input.description?.trim())}
      >
        Create
      </button>
    </GenericModal>
  );
}
