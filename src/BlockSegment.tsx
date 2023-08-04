interface BlockSegmentProps {
  selected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  color?: string;
}

export const BlockSegment: React.FC<BlockSegmentProps> = ({
  selected,
  onClick,
  onDoubleClick,
  color,
}) => {
  return (
    <div
      className={`block-segment ${selected ? 'rounded-xl' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
};
