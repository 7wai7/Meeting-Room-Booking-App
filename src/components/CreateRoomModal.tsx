import { useState } from "react";
import css from "../styles/CreateRoomModal.module.css";
import type { MeetingRoomInput } from "../types/MeetingRoom";
import { createRoomApi } from "../services/room.api";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRoomModal({ isOpen, setIsOpen }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [input, setInput] = useState<Partial<MeetingRoomInput>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    createRoomApi(input as MeetingRoomInput)
      .then(() => {
        setIsOpen(false);
        setInput({});
      })
      .catch((err) => setError(err.message));
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
        {error && <p className={css.error_message}>{error}</p>}
      </form>
    </section>
  );
}
