import requests

url ="https://bored-api.appbrewery.com/random"

def make_request():
    response = requests.get(url)
    data = response.json()
    
    activity = data['activity']
    type_ = data['type']
    participants = data['participants']
    price = data['price']
    link = data['link']
    key = data['key']
    accessibility = data['accessibility']
    
    return {
        "activity": activity,
        "type": type_,
        "participants": participants,
        "price": price,
        "link": link,
        "key": key,
        "accessibility": accessibility
    }

def get_bored_activity():
    return make_request()