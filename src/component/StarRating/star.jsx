const StarIcon = ({
  onClick,
  className,
  value,
  onMouseEnter,
  onMouseLeave,
} = props) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onClick(value)}
      className={className}
      onMouseEnter={() => onMouseEnter(value)}
      onMouseLeave={onMouseLeave}
    >
      <path d="M12 2L14.9 8.63L22 9.24L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.24L9.1 8.63L12 2Z" />
    </svg>
  );
};

export default StarIcon;
