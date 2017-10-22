class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = "intis_secret_key"

    # DATABASE SETTINGS
    pg_db_username = "postgres"
    pg_db_password = "password"
    pg_db_name = "intis"
    pg_db_hostname = "localhost"

    # PostgreSQL
    SQLALCHEMY_DATABASE_URI = "postgresql://{DB_USER}:{DB_PASS}@{DB_ADDR}/{DB_NAME}".format(
        DB_USER=pg_db_username,
        DB_PASS=pg_db_password,
        DB_ADDR=pg_db_hostname,
        DB_NAME=pg_db_name
    )
