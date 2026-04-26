'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CarViewer3D from '@/components/3d/CarViewer3D';
import { ColorPicker3D } from '@/components/shop/ColorPicker3D';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: string;
  name: string;
  basePrice: number;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', params.slug],
    queryFn: async () => {
      const res = await fetch(`/api/products/${params.slug}`);
      if (!res.ok) throw new Error('Không thể tải dữ liệu sản phẩm');
      return res.json();
    },
  });

  if (isLoading || !product) return <div className="p-6">Loading...</div>;

  return (
    <main className="min-h-screen">
      <section className="relative">
        <CarViewer3D modelPath="/models/byd-seal/seal.glb" color={selectedColor} autoRotate />

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">{product.name}</h1>
          <p className="text-3xl font-bold text-green-400">
            {product.basePrice.toLocaleString('vi-VN')} VND
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-4 text-xl font-bold">Chọn màu xe</h2>
        <ColorPicker3D selectedColor={selectedColor} onColorChange={setSelectedColor} />
        <div className="mt-8 flex gap-4">
          <Button size="lg" onClick={() => addToCart(product, selectedColor)}>
            Thêm vào giỏ hàng
          </Button>
          <Button size="lg" variant="outline">
            Đặt lịch lái thử
          </Button>
        </div>
      </section>
    </main>
  );
}
