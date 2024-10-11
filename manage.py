# МогучийДД (MoguchiyDD)
# 2024.10.10, 08:56 PM
# manage.py


from flask.cli import FlaskGroup
from server import app
from server.models import db

cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


if __name__ == "__main__":
    cli()
