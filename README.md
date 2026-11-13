# Nuôi Tao

Nuôi Tao là một chương trình kết nối những người muốn hỗ trợ tài chính với những người đang gặp khó khăn trong việc tiếp tục học tập và phát triển bản thân.

Đây là ứng dụng web được xây dựng bằng Next.js, React, Tailwind CSS và TypeScript. Ứng dụng cung cấp trang giới thiệu chương trình, danh sách người cần hỗ trợ, trang đăng ký tài trợ và trang sao kê.

## Bắt đầu

Cài đặt dependencies:

```bash
bun install
```

Khởi chạy development server:

```bash
bun run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## Scripts

- `bun run dev` - Khởi chạy development server.
- `bun run build` - Tạo production build.
- `bun run start` - Chạy production server.

Có thể dùng `npm` hoặc `pnpm` thay cho `bun` nếu cần.

## Cấu trúc chính

- `app/` - Các route và giao diện Next.js.
- `components/` - Các component giao diện dùng chung.
- `lib/` - Nội dung và tiện ích dùng chung.
- `migrations/` - Database migrations.

## License

Dự án được phát hành theo [MIT License](./LICENSE).
