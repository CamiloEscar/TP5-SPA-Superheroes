from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_DETAILS = os.getenv("MONGO_URL", "mongodb://mongo:27017")

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

db = MongoDB()

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(MONGO_DETAILS)
    db.db = db.client.superheroesdb
    print("Conexión a Mongo exitosa.")

async def close_mongo_connection():
    if db.client:
        db.client.close()
    print("Conexión a MongoDB cerrada.")
