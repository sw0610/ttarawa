import os

# DB 연결 정보
DB_HOST = 'j8a605.p.ssafy.io'
DB_PORT = 3306
DB_USER = 'ssafy605'
DB_PASSWORD = 'ssafy605'
DB_NAME = 'ssafy605'

# SQLAlchemy 설정
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = f'mariadb://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

# Flask 앱 설정
SECRET_KEY = os.environ.get('SECRET_KEY') or 'ssafy605-secret-key'
