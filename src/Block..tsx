import { useState } from 'react';
import { IBlock, Modes } from './types';
import BlockContainer from './BlockContainer';
import BlockInputForm from './BlockInputForm';
import { createBlock } from './misc';

export function Block() {
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [mode, setMode] = useState<Modes>('standard');

  const switchMode = (mode?: Modes) => {
    setMode((modeOld) => mode || (modeOld === 'standard' ? 'enhanced' : 'standard'));
  };

  const toggleSelectBlock = (id: number) => {
    setSelectedId((idOld) => (idOld === id ? -1 : id));
  };

  const removeBlock = (id: number) => {
    const updatedBlocks = blocks.map((block) => (block.id === id ? createBlock(null) : block));
    setBlocks(updatedBlocks);
    setSelectedId(-1);
  };

  const checkEnoughSpace = (length: number) => {
    const freeSpace = blocks.filter((block) => block.id === null).length;
    return freeSpace >= length;
  };

  const findNextId = () => {
    return 1 + blocks.reduce((max, block) => (block.id && block.id > max ? block.id : max), 0);
  };

  const fitBlockStandard = (length: number) => {
    const nextId = findNextId();
    let blocksLeft = length;
    const updatedBlocks = blocks.map((block) => {
      if (!blocksLeft || block.id) return block;
      blocksLeft--;
      return createBlock(nextId);
    });
    setBlocks(updatedBlocks);
  };

  const fitBlockEnhanced = (length: number) => {
    let currSpace = 0;

    for (let i = 0; i < blocks.length; i++) {
      if (!blocks[i].id) currSpace++;
      else currSpace = 0;
      if (currSpace !== length) continue;

      const firstIndex = i - length + 1;
      const nextId = findNextId();

      const updatedBlocks = blocks.map((block, j) => {
        if (j < firstIndex || j > i) return block;
        return createBlock(nextId);
      });
      setBlocks(updatedBlocks);

      return true;
    }

    return false;
  };

  const addBlock = (length: number) => {
    if (!checkEnoughSpace(length)) return alert('Не хватает места');
    if (mode === 'standard' || !fitBlockEnhanced(length)) fitBlockStandard(length);
  };

  const setContainerLength = (length: number) => {
    const updatedBlocks = Array(length)
      .fill(null)
      .map(() => createBlock(null));
    setBlocks(updatedBlocks);
  };

  const rearrangeBlocks = () => {};

  return (
    <>
      {blocks.length ? (
        <>
          <BlockContainer
            blocks={blocks}
            handleBlockClick={toggleSelectBlock}
            handleBlockDoubleClick={removeBlock}
            selectedId={selectedId}
          />
          <BlockInputForm
            onSave={addBlock}
            onSwitch={switchMode}
            mode={mode}
            onRearrange={rearrangeBlocks}
          />
        </>
      ) : (
        <BlockInputForm onSave={setContainerLength} onSwitch={switchMode} mode={mode} />
      )}
    </>
  );
}
