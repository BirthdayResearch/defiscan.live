export function CircularCrossIcon({
  className,
  width = 14,
  height = 14,
}: {
  className: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.00065 0.333984C10.6873 0.333984 13.6673 3.31398 13.6673 7.00065C13.6673 10.6873 10.6873 13.6673 7.00065 13.6673C3.31398 13.6673 0.333984 10.6873 0.333984 7.00065C0.333984 3.31398 3.31398 0.333984 7.00065 0.333984ZM9.39398 3.66732L7.00065 6.06065L4.60732 3.66732L3.66732 4.60732L6.06065 7.00065L3.66732 9.39398L4.60732 10.334L7.00065 7.94065L9.39398 10.334L10.334 9.39398L7.94065 7.00065L10.334 4.60732L9.39398 3.66732Z"
        className={className}
      />
    </svg>
  );
}
