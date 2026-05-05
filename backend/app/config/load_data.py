import os
import json
from .db import db

async def load_data():
    count = await db.db.superheroes.count_documents({})

    if count == 0:
        file_path = os.path.join(os.path.dirname(__file__), "../data/superheroes.json")
        file_path = os.path.abspath(file_path)

        with open(file_path, "r") as f:
            data = json.load(f)
            await db.db.superheroes.insert_many(data)
            print(f"{len(data)} documentos insertados correctamente")
    else:
        print("Los datos ya fueron cargados, no hubo modificación")
