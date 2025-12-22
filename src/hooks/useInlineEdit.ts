import { useEffect, useState } from "react";

type UseInlineEditOptions<T> = {
  value: T;
  onSave: (value: T) => void;
};

export function useInlineEdit<T>({ value, onSave }: UseInlineEditOptions<T>) {
  const [localValue, setLocalValue] = useState(value);
  const [lastValue, setLastValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
    setLastValue(value);
  }, [value]);

  const onChange = (v: T) => setLocalValue(v);

  const onBlur = () => {
    if (localValue !== lastValue) {
      setLastValue(localValue);
      onSave(localValue);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Для input: Enter завершує редагування
    if (e.key === "Enter" && !(e.shiftKey || e.metaKey || e.ctrlKey)) {
      (e.target as HTMLElement).blur();
    }
    // Escape для скасування
    if (e.key === "Escape") setLocalValue(lastValue);
  };

  const setValue = (value: T) => {
    setLocalValue(value);
    setLastValue(value);
  };

  return {
    value: localValue,
    setValue,
    onChange,
    onBlur,
    onKeyDown,
  };
}
