import { useState } from 'react';
import { BlockSegment } from './BlockSegment';
import { COLORS, createBlock } from './misc';
import { IBlock } from './types';
import { useOnClickOutside } from './hooks';

type BlockContainerProps = {
  blocks: IBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>;
};

const BlockContainer = ({ blocks, setBlocks }: BlockContainerProps) => {
  const [selectedId, setSelectedId] = useState<number>(-1);
  const element = useOnClickOutside<HTMLDivElement>(() => setSelectedId(-1));

  const toggleSelectBlock = (id: number) => {
    setSelectedId((idOld) => (idOld === id ? -1 : id));
  };

  const removeBlock = (id: number) => {
    const updatedBlocks = blocks.map((block) => (block.id === id ? createBlock(null) : block));
    setBlocks(updatedBlocks);
    setSelectedId(-1);
  };

  return (
    <div className="block-container" ref={element}>
      {blocks.map((block) =>
        block.id === null ? (
          <div className="grow" key={block.keyId} />
        ) : (
          <BlockSegment
            key={block.keyId}
            selected={block.id === selectedId}
            color={COLORS[block.id % 100]}
            onClick={() => toggleSelectBlock(block.id!)}
            onDoubleClick={() => removeBlock(block.id!)}
          />
        )
      )}
    </div>
  );
};

export default BlockContainer;
