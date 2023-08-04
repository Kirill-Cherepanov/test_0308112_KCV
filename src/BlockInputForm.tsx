import { useState } from 'react';
import { Modes } from './types';

type BlockInputFormProps = {
  onSave: (length: number) => unknown;
  onSwitch: (mode?: Modes) => unknown;
  onRearrange?: () => unknown;
  mode: Modes;
};

const BlockInputForm = ({ onSave, onSwitch, onRearrange, mode }: BlockInputFormProps) => {
  const [blockLength, setBlockLength] = useState('');

  const handleSave = () => {
    const length = parseInt(blockLength);
    if (!isNaN(length) && length > 0) {
      onSave(length);
      setBlockLength('');
    }
  };

  return (
    <div>
      {onRearrange && <button onClick={() => onRearrange()}>Упорядочить</button>}
      <button onClick={() => onSwitch()}>
        {mode === 'standard' ? 'Стандартный' : 'Улучшенный'} режим
      </button>
      <label>
        <span>Введите длину блока</span>
        <input
          type="number"
          value={blockLength}
          onChange={(e) => setBlockLength(e.target.value)}
          placeholder="Длина блока"
        />
      </label>
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default BlockInputForm;
