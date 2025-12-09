import requests
import json

url = "https://bible-api.com/data/web/random"

def make_request():
    response = requests.get(url)
    data = response.json()
    data = json.dumps(data, indent=4)

    loaded_data = json.loads(data)

    book = loaded_data['random_verse']['book']
    chapter = loaded_data['random_verse']['chapter']
    verse = loaded_data['random_verse']['verse']
    text = loaded_data['random_verse']['text']
    
    return {
        "book": book,
        "chapter": chapter,
        "verse": verse,
        "text": text
    }

def get_random_verse():
    return make_request()