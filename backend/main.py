import pandas as pd;
from fastapi import FastAPI;
from fastapi.middleware.cors import CORSMiddleware;
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

#GET -> Getting information from the server
#POST -> Push smthg new to the server
#PUT -> Change smthg
#DELETE -> deleting stuff


BASE_DIR = os.path.dirname(__file__)
df = pd.read_csv(os.path.join(BASE_DIR, "stock_trends.csv"))

@app.get('/screener')
def scr():
    return df.to_dict(orient="records")

@app.get('/screener/trending')
def scrtr():
    trending_data = df[df["is_trending"] == True]
    return trending_data.to_dict(orient="records")

