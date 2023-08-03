import { useState } from 'react';

type BlockInputFormProps = { onSave: (length: number) => unknown };

const BlockInputForm = ({ onSave }: BlockInputFormProps) => {
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
