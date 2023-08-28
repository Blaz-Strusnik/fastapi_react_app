from sqlalchemy import Boolean, Column, Integer, String, Numeric

from .session import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

class MovieTable(Base):
    __tablename__ = 'movies'
    
    id = Column(Integer, primary_key=True)  # Assuming an 'id' field as primary key
    
    budget = Column(Numeric(11, 1))
    company = Column(String(73))
    country = Column(String(30))
    director = Column(String(32))
    genre = Column(String(9))
    gross = Column(Numeric(11, 1))
    name = Column(String(83))
    rating = Column(String(13))
    released = Column(String(10))
    runtime = Column(Integer)
    score = Column(Numeric(3, 1))
    star = Column(String(27))
    votes = Column(Integer)
    writer = Column(String(32))
    year = Column(Integer)

