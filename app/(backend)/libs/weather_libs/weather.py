import requests
import dotenv

dotenv.load_dotenv()

api_key = dotenv.get_key(dotenv.find_dotenv(), "WEATHER_API_KEY")


url = f"https://api.openweathermap.org/data/2.5/weather?q=Philippines&appid={api_key}"

def make_request():
    response = requests.get(url)
    data = response.json()
    
    weather_main = data['weather'][0]['main']
    weather_description = data['weather'][0]['description']
    temp_kelvin = data['main']['temp']
    temp_celsius = temp_kelvin - 273.15
    humidity = data['main']['humidity']
    wind_speed = data['wind']['speed']
    
    # return {
    #     "weather_main": weather_main,
    #     "weather_description": weather_description,
    #     "temp_celsius": round(temp_celsius, 2),
    #     "humidity": humidity,
    #     "wind_speed": wind_speed
    # }
    return data
def get_weather():
    return make_request()

print(get_weather())