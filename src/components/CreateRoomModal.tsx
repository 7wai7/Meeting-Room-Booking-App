import { useState } from "react";
import css from "../styles/CreateRoomModal.module.css";
import type { MeetingRoom, MeetingRoomInput } from "../types/MeetingRoom";
import { createRoomApi } from "../services/room.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRoomModal({ isOpen, setIsOpen }: Props) {
  const [input, setInput] = useState<Partial<MeetingRoomInput>>({});
  const queryClient = useQueryClient();
  const {
    mutate: createRoom,
    isPending,
    error,
  } = useMutation({
    mutationFn: createRoomApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["rooms-list"], (prev: MeetingRoom[]) => [
        ...prev,
        data,
      ]);
      setIsOpen(false);
      setInput({});
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRoom(input as MeetingRoomInput);
  };

  if (!isOpen) return;

  return (
    <section className={css.modal} onClick={() => setIsOpen(false)}>
      <form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()}>
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
        {error && <p className={css.error_message}>{error.message}</p>}
        {isPending && (
          <div className={css.pending_panel}>
            <LoadingSpinner
              size={4}
              description="none"
            />
          </div>
        )}
      </form>
    </section>
  );
}
