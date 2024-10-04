# ActiveToolApp

## Giới thiệu
abc

## Các bước cài đặt

### 1. Clone project 
Để bắt đầu, bạn cần clone repository về máy:
```bash
git clone https://github.com/TNuan/ActiveToolApp.git
cd ActiveToolApp
```
### 2. Cài đặt PostgreSQL
- Nếu bạn chưa cài đặt PostgreSQL, hãy tải và cài đặt theo hướng dẫn sau:
 => [Tải PostgreSQL](https://www.postgresql.org/download/)
- Sau khi cài đặt, tạo cơ sở dữ liệu mới:
    1. Đăng nhập PostgreSQL:
        ```bash
        sudo -u postgres psql
        ```
    2. Tạo cơ sở dữ liệu và người dùng:
        ```sql
        CREATE DATABASE your_db_name;
        CREATE USER your_db_user WITH PASSWORD 'your_password';
        ALTER ROLE your_db_user SET client_encoding TO 'utf8';
        ALTER ROLE your_db_user SET default_transaction_isolation TO 'read committed';
        ALTER ROLE your
        ```

### 3. Tải Docker (nếu chưa có)
- Nếu máy bạn chưa cài Docker, bạn có thể tải về và cài đặt tại: => [Tải Docker](https://www.docker.com/products/docker-desktop/)
- Kiểm tra Docker đã được cài đặt thành công bằng lệnh:
    ```bash
    docker --version
    ```

### 4. Tạo file .env
- Tạo một file .env trong thư mục gốc của dự án dựa trên file .env.example. Điền các thông tin database đã tạo vào file .env:

## 5. Chạy Docker
- Sau khi đã chuẩn bị đầy đủ, bạn có thể chạy dự án bằng Docker với lệnh sau:
    ```bash
    docker-compose up --build
    ```
