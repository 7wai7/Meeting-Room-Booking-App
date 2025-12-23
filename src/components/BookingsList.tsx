import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { memo } from "react";
import { getAllBookingsApi } from "../services/api";
import type { BookingWithRoom } from "../types/Booking";
import LoadingSpinner from "./LoadingSpinner";
import css from "../styles/BookingsList.module.css";

export const BookingsList = memo(function () {
  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings-list"],
    queryFn: getAllBookingsApi,
  });

  return (
    <section className={css.list}>
      <div className={clsx(css.grid, css.list_header)}>
        <p>Room</p>
        <p>Date</p>
        <p>Time</p>
        <p>Description</p>
      </div>
      <hr />
      {bookings.map((data) => (
        <BookingItem key={data.id} data={data} />
      ))}
      {isLoading && (
        <LoadingSpinner
          size={3}
          className={css.loading_spinner}
          description="none"
        />
      )}
      {error && <span className="error_message">{error.message}</span>}
    </section>
  );
});

interface BookingItemProps {
  data: BookingWithRoom;
  onClick?: () => void;
}

function BookingItem({ data, onClick }: BookingItemProps) {
  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(data.date));

  const formattedStartTime = new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(data.start));

  const formattedEndTime = new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(data.end));

  return (
    <div className={clsx(css.bookings_item, css.grid)} onClick={onClick}>
      <h3 className={css.room_title}>{data.room.title}</h3>
      <p className={css.date}>{formattedDate}</p>
      <p className={css.time}>
        {formattedStartTime} - {formattedEndTime}
      </p>
      <p className={css.description}>{data.description}</p>
    </div>
  );
}
