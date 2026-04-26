'use client';

import { ButtonHTMLAttributes } from 'react';

type Variant = 'default' | 'outline';
type Size = 'default' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'default', size = 'default', className = '', ...props }: ButtonProps) {
  const variantClass =
    variant === 'outline'
      ? 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100'
      : 'bg-black text-white hover:bg-gray-800';

  const sizeClass = size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm';

  return (
    <button
      {...props}
      className={`rounded-md font-medium transition-colors disabled:opacity-50 ${variantClass} ${sizeClass} ${className}`}
    />
  );
}
