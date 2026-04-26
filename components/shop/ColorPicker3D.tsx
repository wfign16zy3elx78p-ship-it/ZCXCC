'use client';

const COLORS = [
  { name: 'Trắng', hex: '#FFFFFF' },
  { name: 'Đen', hex: '#111111' },
  { name: 'Đỏ', hex: '#E11D48' },
  { name: 'Xanh dương', hex: '#2563EB' },
  { name: 'Xanh lá', hex: '#059669' },
  { name: 'Xám', hex: '#6B7280' },
];

interface ColorPicker3DProps {
  selectedColor: string;
  onColorChange: (hex: string) => void;
}

export function ColorPicker3D({ selectedColor, onColorChange }: ColorPicker3DProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {COLORS.map((color) => (
        <button
          key={color.hex}
          type="button"
          onClick={() => onColorChange(color.hex)}
          className={`h-10 w-10 rounded-full border-2 transition-all ${
            selectedColor === color.hex
              ? 'scale-110 border-blue-500 shadow-lg'
              : 'border-gray-300'
          }`}
          style={{ backgroundColor: color.hex }}
          title={color.name}
          aria-label={`Màu ${color.name}`}
        />
      ))}
    </div>
  );
}
