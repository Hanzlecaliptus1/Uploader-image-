# Image Uploader Example

Proyek contoh sederhana untuk meng-upload gambar menggunakan:
- Frontend: HTML, CSS, JavaScript (vanilla)
- Backend: Node.js + Express + Multer

Fitur:
- Drag & drop atau pilih file
- Preview sebelum upload
- Progress bar saat upload
- Server menyimpan file di folder `uploads/` dan menyajikannya lewat route `/uploads/<filename>`

Cara menjalankan:
1. Pastikan Node.js terinstal (versi LTS direkomendasikan).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan server:
   ```bash
   npm start
   ```
   atau untuk pengembangan (automatic restart):
   ```bash
   npm run dev
   ```
4. Buka browser ke `http://localhost:3000`

Catatan keamanan / produksi:
- Contoh ini untuk keperluan belajar. Untuk penggunaan produksi:
  - Validasi tambahan (ukuran, tipe, scanning malware).
  - Simpan file di storage yang lebih aman (S3, Google Cloud Storage).
  - Batasi akses ke upload jika dibutuhkan autentikasi.
  - Gunakan helmet, rate-limiting, dan sanitasi nama file lebih ketat.
