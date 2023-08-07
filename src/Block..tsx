import { useState } from 'react';
import { IBlock, Modes } from './types';
import BlockContainer from './BlockContainer';
import BlockInputForm from './BlockInputForm';
import { createBlock } from './misc';

export function Block() {
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [mode, setMode] = useState<Modes>('standard');

  const switchMode = (mode?: Modes) => {
    setMode((modeOld) => mode || (modeOld === 'standard' ? 'enhanced' : 'standard'));
  };

  const checkIsEnoughSpace = (length: number) => {
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
    const updateBlocks = (firstIndex: number, lastIndex: number) => {
      const nextId = findNextId();
      const updatedBlocks = blocks.map((block, i) => {
        if (i < firstIndex || i > lastIndex) return block;
        return createBlock(nextId);
      });
      setBlocks(updatedBlocks);
    };

    let currSpace = 0;
    for (let i = 0; i < blocks.length; i++) {
      if (!blocks[i].id) currSpace++;
      else currSpace = 0;
      if (currSpace !== length || !blocks[i + 1]?.id) continue;
      updateBlocks(i - length + 1, i);
      return true;
    }

    currSpace = 0;
    for (let i = 0; i < blocks.length; i++) {
      if (!blocks[i].id) currSpace++;
      else currSpace = 0;
      if (currSpace !== length) continue;
      updateBlocks(i - length + 1, i);
      return true;
    }

    return false;
  };

  const addBlock = (length: number) => {
    if (!checkIsEnoughSpace(length)) return alert('Не хватает места');
    if (mode === 'standard' || !fitBlockEnhanced(length)) fitBlockStandard(length);
  };

  const setContainerLength = (length: number) => {
    const updatedBlocks = Array(length)
      .fill(null)
      .map(() => createBlock(null));
    setBlocks(updatedBlocks);
  };

  const rearrangeBlocks = () => {
    type Arrangement = {
      id: number;
      length: number;
    }[];
    const newArrangement: Arrangement = [];
    blocks.forEach((block) => {
      if (!block.id) return;
      const newBlock = newArrangement.find((newBlock) => newBlock.id === block.id);
      if (newBlock) return newArrangement[newArrangement.indexOf(newBlock)].length++;
      newArrangement.push({ id: block.id, length: 1 });
    });

    const updatedBlocks: IBlock[] = [];
    newArrangement.forEach((newBlock) => {
      for (let i = 0; i < newBlock.length; i++) updatedBlocks.push(createBlock(newBlock.id));
    });
    while (blocks.length > updatedBlocks.length) updatedBlocks.push(createBlock(null));
    setBlocks(updatedBlocks);
  };

  const resetBlocks = () => {
    setBlocks([]);
  };

  return (
    <>
      {blocks.length ? (
        <>
          <BlockContainer blocks={blocks} setBlocks={setBlocks} />
          <BlockInputForm
            onSave={addBlock}
            onSwitch={switchMode}
            mode={mode}
            onRearrange={rearrangeBlocks}
            onReturn={resetBlocks}
          />
        </>
      ) : (
        <BlockInputForm onSave={setContainerLength} onSwitch={switchMode} mode={mode} />
      )}
    </>
  );
}
