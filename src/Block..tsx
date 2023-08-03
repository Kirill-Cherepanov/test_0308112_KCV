import { useState } from 'react';
import { IBlock } from './types';
import BlockContainer from './BlockContainer';
import BlockInputForm from './BlockInputForm';
import { createBlock } from './misc';

export function Block() {
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [selectedId, setSelectedId] = useState<number>(-1);

  const selectBlock = (id: number) => {
    setSelectedId(id);
  };

  const removeBlock = (id: number) => {
    const updatedBlocks = blocks.map((block) => (block.id === id ? createBlock(null) : block));
    setBlocks(updatedBlocks);
    setSelectedId(-1);
  };

  const addBlock = (length: number) => {
    const freeSpace = blocks.filter((block) => block.id === null).length;
    if (length > freeSpace) return alert('Не хватает места');

    let blocksLeft = length;
    const maxId = blocks.reduce((max, block) => (block.id && block.id > max ? block.id : max), 0);
    const updatedBlocks = blocks.map((block) => {
      if (!blocksLeft || block.id) return block;
      blocksLeft--;
      return createBlock(maxId + 1);
    });
    setBlocks(updatedBlocks);
  };

  const setContainerLength = (length: number) => {
    const updatedBlocks = Array(length)
      .fill(null)
      .map(() => createBlock(null));
    setBlocks(updatedBlocks);
  };

  return (
    <>
      {blocks.length ? (
        <>
          <BlockContainer
            blocks={blocks}
            handleBlockClick={selectBlock}
            handleBlockDoubleClick={removeBlock}
            selectedId={selectedId}
          />
          <BlockInputForm onSave={addBlock} />
        </>
      ) : (
        <BlockInputForm onSave={setContainerLength} />
      )}
    </>
  );
}
