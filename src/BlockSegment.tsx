import { Block } from './types';

interface BlockSegmentProps {
  block: Block;
  onClick: () => void;
  onDoubleClick: () => void;
}

const BlockSegment: React.FC<BlockSegmentProps> = ({ block, onClick, onDoubleClick }) => {
  return (
    <div
      className={`${block.selected ? 'selected' : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
};

export default BlockSegment;
