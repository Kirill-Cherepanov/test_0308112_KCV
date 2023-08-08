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
    <form
      className={clsx('form-container w-full', !onReturn && 'justify-center mt-4')}
      onSubmit={(e) => {
        handleSave();
        e.preventDefault();
      }}
    >
      <div>
        <label className={clsx('block', onReturn ? 'sm:max-w-[15rem]' : 'mt-2 sm:w-96')}>
          <div className="text-xs">Введите длину {onReturn ? 'блока' : 'контейнера'}</div>
          <input
            type="number"
            value={blockLength}
            onChange={(e) => setBlockLength(e.target.value)}
            placeholder={`Длина ${onReturn ? 'блока' : 'контейнера'}`}
            className="form-input"
          />
        </label>
        <button className="black-btn w-full" type="submit">
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
    </form>
  );
};

export default BlockInputForm;
