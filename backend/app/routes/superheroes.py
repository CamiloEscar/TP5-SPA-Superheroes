from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

from typing import List
from bson import ObjectId

from app.config.db import db



from app.models.usersuperheroes import SuperheroesModel,superheroesCreateModel


apiroute = APIRouter()

'''def get_collection():
    if db.db is None:
        raise HTTPException(status_code=500, detail="Base de datos no conectada")
    return db.db.superheroes'''

@apiroute.get("/superheroes", response_model=List[SuperheroesModel])
async def get_superheroes():
    heroes = await db.db.superheroes.find().to_list(40)
    return heroes

@apiroute.get("/superheroes/{superhero_id}")
async def get_superhero(superhero_id: str):
    if not ObjectId.is_valid(superhero_id):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "ID de superhéroe inválido."}
        )
    
    superhero = await db.db.superheroes.find_one({"_id": ObjectId(superhero_id)})
    if superhero:
        superhero["_id"] = str(superhero["_id"])
        return superhero
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Superhéroe no encontrado."}
    )

@apiroute.get("/superheroes/house/{house_name}", response_model=List[SuperheroesModel])
async def get_superheroes_byHouse(house_name: str):
    normalized_house_name = house_name.lower()
    if normalized_house_name not in ["dc", "marvel"]: 
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Casa no válida. Debe ser 'dc' o 'marvel'." )
    
    superheroes = db.db.superheroes.find({"house": normalized_house_name})
    docs = await superheroes.to_list()
    return docs

@apiroute.post("/superheroes/createuser")
async def create_superheroe(user: superheroesCreateModel):
    new_user = user.dict()
    new_user["_id"] = ObjectId()
    try:
        await db.db.superheroes.insert_one(new_user)
        print(new_user)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"message": "Superhéroe creado con éxito", "id": str(new_user["_id"])}
        )
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": "No se pudo crear el superhéroe", "detail": str(e)}
        )


@apiroute.put("/superheroes/update")
async def update_superheroe(name: str, house: str, update_data: superheroesCreateModel):  
   
    update_dic = {k: v for k, 
                v in update_data.dict().items() 
                if v not in (None, "string", 0, [], {})}

    result = await db.db.superheroes.update_one(
        {"name": name, "house": house},
        {"$set": update_dic}
    )

    if result.modified_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "Superhéroe actualizado correctamente"}
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": "No se encontró el superhéroe con ese nombre y casa"}
        )
@apiroute.delete("/superheroes/delete")
async def delete_superheroe(name: str): 

    query_filter = await db.db.superheroes.delete_one(
        {"name": name}
    )
    if query_filter.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "Superhéroe eliminado correctamente"}
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": "No se encontró el superhéroe con ese nombre y casa"}
        )
