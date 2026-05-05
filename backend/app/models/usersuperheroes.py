from pydantic import BaseModel, Field, validator
from typing import List, Optional
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def is_valid(cls, v):
        return ObjectId.is_valid(v)


def validate_object_id(v):
    if not ObjectId.is_valid(v):
        raise ValueError("Invalid ObjectId")
    return str(v)

class superheroesCreateModel(BaseModel):
    name: str
    real_name: str
    year: int
    house: str
    bio: str
    equipment: List[str]
    images: List[str]



class SuperheroesModel(superheroesCreateModel):
    id: Optional[str] = Field(alias="_id")  
    

    @validator("id", pre=True, always=True)
    def validate_id(cls, v):
        if v is None:
            return v
        return validate_object_id(v)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

