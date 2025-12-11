import requests

url = 'https://beta.ourmanna.com/api/v1/get/?format=json'

def make_request():
    response = requests.get(url)
    data = response.json()
    # data = json.dumps(data, indent=4)

    # loaded_data = json.loads(data)

    verse = data['verse']['details']['text']
    reference = data['verse']['details']['reference']
    version = data['verse']['details']['version']
    notice = data['verse']['notice']
    
    return {
        "verse":verse,
        "reference":reference,
        "version":version, 
        "notice":notice
    }

def get_random_verse():
    return make_request()