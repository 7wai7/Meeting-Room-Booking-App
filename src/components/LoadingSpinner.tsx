interface Props {
  size?: number;
  description?: string | "none";
  className?: string;
}

export default function LoadingSpinner({
  size = 5,
  description = "Loading...",
  className,
}: Props) {
  return (
    <>
      <div className={`loading-card ${className}`}>
        <div
          className={`loading-spinner`}
          style={{
            fontSize: `${size}rem`,
          }}
        ></div>
        {description !== "none" && (
          <span
            style={{
              fontSize: `${size * 0.3}rem`,
              fontWeight: 500,
            }}
          >
            {description}
          </span>
        )}
      </div>
    </>
  );
}
