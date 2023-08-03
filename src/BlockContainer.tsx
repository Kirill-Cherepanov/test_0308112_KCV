import { COLORS } from './misc';
import { IBlock } from './types';

type BlockContainerProps = {
  blocks: IBlock[];
  handleBlockClick: (id: number) => void;
  handleBlockDoubleClick: (id: number) => void;
  selectedId: number;
};

const BlockContainer = ({
  blocks,
  handleBlockClick,
  handleBlockDoubleClick,
  selectedId,
}: BlockContainerProps) => {
  return (
    <div className="flex h-20 w-full bg-slate-200">
      {blocks.map((block) =>
        block.id === null ? (
          <div className="grow" key={block.keyId} />
        ) : (
          <div
            key={block.keyId}
            className={`grow ${block.id === selectedId ? 'selected' : ''}`}
            style={{ backgroundColor: COLORS[block.id % 100] }}
            onClick={() => handleBlockClick(block.id!)}
            onDoubleClick={() => handleBlockDoubleClick(block.id!)}
          />
        )
      )}
    </div>
  );
};

export default BlockContainer;
