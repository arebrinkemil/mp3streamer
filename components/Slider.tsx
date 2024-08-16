'use client';

import { Slider as ShadCNSlider } from '@/components/ui/slider';

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <ShadCNSlider
      defaultValue={[value]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      className="
        relative
        flex
        items-center
        select-none
        touch-none
        w-full
        h-10
      "
    />
  );
};
