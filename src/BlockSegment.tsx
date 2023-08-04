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
      className={`grow ${selected ? 'border-x scale-y-110' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
};
