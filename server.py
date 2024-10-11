# МогучийДД (MoguchiyDD)
# 2024.10.9, 07:07 PM
# server.py


from flask import Flask


app = Flask(__name__)

__path_keys = "keys/"
__file_cert = f"{__path_keys}cert.pem"
__file_key = f"{__path_keys}key_no_passs.pem"


def api_route(rule, **options):
    return app.route(f"/api{rule}", **options)


@api_route("/endpoint1", methods=["GET"])
def endpoint1():
    return "Hello from endpoint 1!"


@api_route("/endpoint2", methods=["POST"])
def endpoint2():
    return "Hello from endpoint 2!"


if __name__ == "__main__":
    app.run(ssl_context=(__file_cert, __file_key))
