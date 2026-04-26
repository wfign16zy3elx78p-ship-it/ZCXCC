# BYD 3D Shop (Next.js 14) – Starter Blueprint

Dự án này là skeleton theo stack bạn đề xuất:

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- React Three Fiber + Drei + Three.js
- GSAP cho animation
- Zustand cho cart
- React Query cho data fetching
- React Hook Form + Zod cho form đặt lịch
- Prisma + PostgreSQL cho backend API

## 1) Khởi tạo dự án

```bash
npx create-next-app@latest byd-3d-shop --typescript --tailwind --eslint
cd byd-3d-shop
npm install three @types/three @react-three/fiber @react-three/drei gsap
npm install zustand @tanstack/react-query react-hook-form @hookform/resolvers zod date-fns @prisma/client
npx shadcn-ui@latest init
npx shadcn-ui@latest add button select card dialog calendar badge table
npx prisma init --datasource-provider postgresql
```

## 2) Cấu trúc chính

- `components/3d/CarViewer3D.tsx`: Viewer 3D + đổi màu realtime.
- `components/shop/ColorPicker3D.tsx`: Bộ chọn màu.
- `app/(shop)/products/[slug]/page.tsx`: Trang chi tiết sản phẩm.
- `store/cart.ts`: Zustand cart (lưu cả màu hex).
- `app/api/products/[slug]/route.ts`: API lấy chi tiết product từ Prisma.
- `lib/prisma.ts`: Prisma singleton.

## 3) Chuẩn bị model 3D

- Đặt model tại: `public/models/byd-seal/seal.glb`.
- Đảm bảo mesh thân xe có tên: `body` để đổi màu chính xác.
- Ưu tiên file `.glb` dưới 10MB để tối ưu tốc độ tải.

## 4) Lưu ý triển khai thực tế

- Wrap toàn app bằng `QueryClientProvider` (React Query).
- Bổ sung xử lý loading/error state cho API routes.
- Với production: thêm nén model (Draco/Meshopt), cache headers và fallback khi model lỗi.

