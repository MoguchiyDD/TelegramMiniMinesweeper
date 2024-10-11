# Telegram Mini Minesweeper

```bash
$ openssl genrsa -out ./keys/key_no_pass.pem 2048
$ openssl req -new -x509 -key ./keys/key_no_pass.pem -out ./keys/cert.pem -days 365
$ docker compose up --build

$ sudo /etc/init.d/apache2 stop  # optional
```
