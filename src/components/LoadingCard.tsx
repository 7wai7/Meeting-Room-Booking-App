import LoadingSpinner from "./LoadingSpinner";

export default function LoadingCard() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          alignItems: "center",
          gap: "16px",
          color: "#e5e7eb",
        }}
      >
        <LoadingSpinner />

        <div style={{ fontSize: "1.3rem", fontWeight: 500, color: "black" }}>
          Loading…
        </div>
      </div>
    </>
  );
}
