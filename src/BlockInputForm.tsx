import { useState } from 'react';
import { Modes } from './types';
import clsx from 'clsx';

type BlockInputFormProps = {
  onSave: (length: number) => unknown;
  onSwitch: (mode?: Modes) => unknown;
  onRearrange?: () => unknown;
  onReturn?: () => unknown;
  mode: Modes;
};

const BlockInputForm = ({ onSave, onSwitch, onRearrange, onReturn, mode }: BlockInputFormProps) => {
  const [blockLength, setBlockLength] = useState('');

  const handleSave = () => {
    const length = parseInt(blockLength);
    if (!isNaN(length) && length > 0) {
      onSave(length);
      setBlockLength('');
    }
  };

  return (
    <div className={clsx('form-container w-full', !onReturn && 'justify-center mt-4')}>
      <div>
        <label>
          <div className="text-xs">Введите длину {onReturn ? 'блока' : 'контейнера'}</div>
          <input
            type="number"
            value={blockLength}
            onChange={(e) => setBlockLength(e.target.value)}
            placeholder={`Длина ${onReturn ? 'блока' : 'контейнера'}`}
            className="form-input"
          />
        </label>
        <button className="black-btn w-full" onClick={handleSave}>
          {onReturn ? 'Добавить' : 'Сохранить'}
        </button>
      </div>
      {onRearrange && onReturn && (
        <div className="relative sm:bottom-2 form-container">
          <button className="black-btn" onClick={() => onRearrange()}>
            Упорядочить
          </button>
          <button className="black-btn" onClick={() => onSwitch()}>
            {mode === 'standard' ? 'Стандартный' : 'Улучшенный'} режим
          </button>
          <button className="black-btn" onClick={() => onReturn()}>
            Назад
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockInputForm;
