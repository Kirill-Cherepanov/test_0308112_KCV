# Тестовое задание с блоками

[![Website Deployment](https://img.shields.io/badge/Deploy-View%20Website-blue)](https://blocks-kirill-cherepanov.netlify.app/)

https://github.com/Kirill-Cherepanov/test_0308112_KCV/assets/52123816/90d04cf1-1619-4423-b3d8-da45bdf687df

## Описание

Решил я задачу на стаке React + Typescript + Tailwind, что может быть перебором для такой простой задачи, но мне просто было так удобнее и я хотел показать свои навыки.
\
\
При создании контейнера мы заполняем массив введенной пустыми сегментами. 
```typescript
const createBlock = (id: null | number): IBlock => ({ keyId: nanoid(), id });
const setContainerLength = (length: number) => {
  const updatedBlocks = Array(length)
    .fill(null)
    .map(() => createBlock(null));
  setBlocks(updatedBlocks);
};
```
\
\
Из условия задания у нас есть 2 режима установки блоков:
1. Стандартный: Блоки укладываются слева-направо, занимая все существующие пробелы. Т.е. после удаления блока 2, блок 5 длиной 6, ляжет фрагментами.
2. Улучшенный: При вставке нового блока сначала ищется такое же по размеру место, затем большего размера и если не находится, то уже тогда резать.
```typescript
const [mode, setMode] = useState<Modes>('standard');
const switchMode = (mode?: Modes) => {
  setMode((modeOld) => mode || (modeOld === 'standard' ? 'enhanced' : 'standard'));
};
```
\
\
При добавлении блока мы сначала проверяем в каком режиме его нужно добавлять:
```typescript
const addBlock = (length: number) => {
  if (!checkIsEnoughSpace(length)) return alert('Не хватает места');
  if (mode === 'standard' || !fitBlockEnhanced(length)) fitBlockStandard(length);
};
```
\
\
Функции `fitBlockEnhanced` и `fitBlockStandard` соответсвенно отвечают за установку блоков в разных режимах. Если установлен улучшенный режим, то мы сначала проверяем наличие пустых мест, которые могут вместить добавляемый блок полностью без разбиений и если таких мест нет, то мы вмещаем с помощью `fitBlockStandard`.  

```typescript
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
```
\
\
Функция упорядовачивания `rearrangeBlocks` проходит по всем сегментам контейнера и задает им порядок в зависимости от их расположения. То есть если каким-то образом получился такой порядок блоков: 

[1][3][2][3]

То после перестановки у нас будет

[1][3][3][2]

```typescript
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
```
\
\
Другие функции особо не требующие пояснения:

```typescript
const [selectedId, setSelectedId] = useState<number>(-1);
const toggleSelectBlock = (id: number) => {
  setSelectedId((idOld) => (idOld === id ? -1 : id));
};

const removeBlock = (id: number) => {
  const updatedBlocks = blocks.map((block) => (block.id === id ? createBlock(null) : block));
  setBlocks(updatedBlocks);
  setSelectedId(-1);
};
const resetBlocks = () => {
  setBlocks([]);
};
```


## Локальная установка и запуск
```bash
yarn install
yarn dev
```
