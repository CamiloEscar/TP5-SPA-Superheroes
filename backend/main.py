from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.config.load_data import load_data
from app.config.db import connect_to_mongo, close_mongo_connection, db
from app.routes.superheroes import apiroute



@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()

    await load_data()
    yield
    await close_mongo_connection()



app = FastAPI(
    title="Super Heroes + Villanos de Marvel y DC",
    lifespan=lifespan 
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="app/statics"), name="static")
app.include_router(apiroute)