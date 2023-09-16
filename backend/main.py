import lyricsgenius
from fastapi import FastAPI, Response
from fastapi.responses import FileResponse, PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from multiprocessing import Pool
import json
import openai
import requests
import random
import os
from dotenv import load_dotenv
from PIL import Image
import io
import base64

# Load the environment variables from .env file
load_dotenv()

# Access the environment variables
oak = os.getenv("OPENAI_API_KEY")
gak = os.getenv("GENIUS_API_KEY")

genius = lyricsgenius.Genius(gak)
openai.api_key = oak

def get_lyrics(title, artist):
    try:
        # Search for the song lyrics
        song = genius.search_song(title, artist)
        
        if song:
            return song.lyrics
        else:
            return NotImplemented
    
    except Exception as e:
        return None

# can only use 10,000 tokens per minute

def process_song(song):
    l = get_lyrics(*song)

    if l is None:
        return

    messages = [ {"role": "system", "content": "You're job is to take in song lyrics and write describing elements of the lyrics. You response should describe the colors. The shapes and objects. It should explain key details. It should also be under 100 words."} ]
    lyric_message = l.replace("\n", " ") 
    messages.append({"role": "user", "content": lyric_message},)

    chat = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messages, max_tokens=800
    )

    reply = chat.choices[0].message.content

    return reply

app = FastAPI()

@app.post("/create/")
async def create_item(request: Request, response: Response):
    songs = json.loads(await request.body())
    songs = [(song,artist) for song,artist in songs.items()]

    songs = songs[0:6]

    with Pool() as pool:
        replies = pool.map(process_song, songs)

    replies = [reply for reply in replies if reply is not None]
    
    messages = [ {"role": "system", "content": "Given descriptions separated by | characters write a short yet descriptive prompt to generate an image representative of the descriptions. The resulting prompt should be more general, it should make one cohesive image. The prompt should describe an art style that matches the theme of the descriptions. The maximum length of the response should be under 100 words.."} ]
    descriptions = "|".join(replies)
    messages.append({"role": "user", "content": descriptions},)
    chat = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messages, max_tokens=1000
    )

    output = chat.choices[0].message.content + ". There should never be text in the resulting image."

    response = openai.Image.create(
        prompt=output,
        n=4,
        size="1024x1024"
    )
    
    image_urls = [response['data'][i]['url'] for i in range(len(response['data']))]

    letters='abcdefghijklmnopqrstuvwxyz'

    ret_ids = []

    for url in image_urls:
        name = ''.join(random.choice(letters) for i in range(40))
        r = requests.get(url, allow_redirects=True)
        image_data = r.content
        image_stream = io.BytesIO(image_data)
        image = Image.open(image_stream)
        image.save("images/" + name + ".jpg",  optimize=True, quality=10)
        ret_ids.append(name)

    response_data = "[\""+"\",\"".join(ret_ids)+"\"]"

    headers = {"Access-Control-Allow-Origin": "*"}
    return Response(content=response_data, headers=headers)

@app.get("/image/{image_id}")
def get_image(image_id):
    headers = {"Access-Control-Allow-Origin": "*"}
    return FileResponse("images/" + image_id + ".jpg", headers=headers)

@app.get("/image_blob/{image_id}")
def get_image(image_id):
    headers = {"Access-Control-Allow-Origin": "*"}
    with open("images/" + image_id + ".jpg", "rb") as file:
        file_bytes = file.read()
    base64_encoded = base64.b64encode(file_bytes).decode('utf-8')
    return PlainTextResponse(base64_encoded, headers=headers)