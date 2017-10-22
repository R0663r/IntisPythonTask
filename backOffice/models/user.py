from datetime import datetime

from backOffice import db


class User(db.Model):
    __tablename__ = 'tbl_users'

    id = db.Column(db.Integer, nullable=False, unique=True, autoincrement=True, primary_key=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("tbl_roles.id"), nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime)

    role = db.relationship("Role")

    def __init__(
            self,
            first_name,
            last_name,
            email,
            password,
            role_id,
            active,
            created_at=datetime.now(),
            updated_at=None,
            **kwargs
    ):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.role_id = role_id
        self.active = active
        self.created_at = created_at
        self.updated_at = updated_at

    def __repr__(self):
        return "<User(id={}, first_name={}, last_name={}, email={}, role_id={}, active={}, created_at={})>".format(
            self.id, self.first_name, self.last_name, self.email, self.role_id, self.active, self.created_at
        )
