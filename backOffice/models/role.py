from backOffice import db


class Role(db.Model):
    __tablename__ = "tbl_roles"

    id = db.Column(db.Integer, nullable=False, unique=True, autoincrement=True, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<Role(id={}, name={})>".format(self.id, self.name)
