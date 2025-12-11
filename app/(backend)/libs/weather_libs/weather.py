import requests
import dotenv

dotenv.load_dotenv()

api_key = dotenv.get_key(dotenv.find_dotenv(), "WEATHER_API_KEY")


url = f"https://api.openweathermap.org/data/2.5/weather?q=Japan&appid={api_key}"

def make_request():
    response = requests.get(url)
    data = response.json()
    
    weather_main = data['weather'][0]['main']
    weather_description = data['weather'][0]['description']
    temp_min_kelvin = data['main']['temp']
    temp_max_kelvin = data['main']['temp_max']
    temp_min_celsius = temp_min_kelvin - 273.15
    temp_max_celsius = temp_max_kelvin - 273.15
    humidity = data['main']['humidity']
    wind_speed = data['wind']['speed']
    
    return {
        "weather_main": weather_main,
        "weather_description": weather_description,
        "temp_min_celsius": round(temp_min_celsius, 2),
        "temp_max_celsius": round(temp_max_celsius, 2),
        "humidity": humidity,
        "wind_speed": wind_speed
    }

def get_weather():
    return make_request()

#print(get_weather())