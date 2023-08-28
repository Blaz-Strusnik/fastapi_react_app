from fastapi import APIRouter, Request, Depends, Response, encoders, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import typing as t
import httpx
import asyncio

from app.db.session import get_db
from app.db.crud import (
    get_users,
    get_user,
    create_user,
    delete_user,
    edit_user,
)
from app.db.schemas import UserCreate, UserEdit, User, UserOut
from app.core.auth import get_current_active_user, get_current_active_superuser
from dotenv import load_dotenv
import os
movie_router = r = APIRouter()

# Load environment variables from .env file
load_dotenv()

# Access environment variables
omdb_api_key = os.environ.get("OMDB_API_KEY")
debug_mode = os.environ.get("DEBUG")


@r.get("/movie/{title}")
async def get_movie_info(title: str):
    if not title:
        raise HTTPException(status_code=400, detail="Title parameter is required")

    omdb_url = f"http://www.omdbapi.com/?t={title}&apikey={omdb_api_key}"

    async with httpx.AsyncClient() as client:
        response = await client.get(omdb_url)
        response_data = response.json()

        if response_data.get("Response") == "True":
            return response_data
        else:
            raise HTTPException(status_code=404, detail="Movie not found")


