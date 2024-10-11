# Telegram Mini Minesweeper

```bash
$ openssl genrsa -out key_no_pass.pem 2048
$ openssl req -new -x509 -key key_no_pass.pem -out cert.pem -days 365
$ docker compose up --build

$ sudo /etc/init.d/apache2 stop  # optional
```
