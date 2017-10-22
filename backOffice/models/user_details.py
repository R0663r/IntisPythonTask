from datetime import datetime

from backOffice import db
from backOffice.models.user import User


class UserDetails(User):
    __tablename__ = "tbl_user_details"

    user_id = db.Column(db.Integer, db.ForeignKey("tbl_users.id"), nullable=False, unique=True, primary_key=True)
    address = db.Column(db.String(100))
    phone = db.Column(db.String(50))
    postal_code = db.Column(db.String(30))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    avatar = db.Column(db.String(100))
    data_created = db.Column(db.DateTime, nullable=False)
    data_updated = db.Column(db.DateTime, nullable=False)

    def __init__(
            self,
            first_name,
            last_name,
            email,
            password,
            role_id,
            active,
            address,
            phone,
            postal_code,
            date_of_birth,
            gender,
            avatar,
            data_created=datetime.now(),
            data_updated=datetime(year=1900, month=1, day=1, hour=0, minute=0, second=0),
            **kwargs
    ):
        super().__init__(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            role_id=role_id,
            active=active,
            created_at=data_created,
            updated_at=data_updated
        )
        self.address = address
        self.phone = phone
        self.postal_code = postal_code
        self.date_of_birth = date_of_birth
        self.gender = gender
        self.avatar = avatar
        self.data_created = data_created
        self.data_updated = data_updated

    def __repr__(self):
        return "<UserDetails(user_id={}, address={}, phone={}, postal_code={}, date_of_birth={}, gender={})>".format(
            self.user_id, self.address, self.phone, self.postal_code, self.date_of_birth, self.gender
        )
