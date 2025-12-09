from libs.email_libs.email_analyzer import analyze as analyze_email
from libs.bible_libs.bible_api_request import get_random_verse
from libs.bored_libs.bored import get_bored_activity


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/bored_activity")
async def get_bored():
    return get_bored_activity()

@app.get("/verse_of_the_day")
async def get_votd():
    return get_random_verse()

@app.get("/analyze")
async def analyze():
    return analyze_email()