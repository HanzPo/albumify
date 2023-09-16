from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Tuple

app = FastAPI()

class SongList(BaseModel):
    songlist: List[Tuple[str, str]]

@app.get("/make_images")
def make_images(songlist: SongList):
    for song in songlist.songlist:
        # get lyrics
        artist_name, song_name = song
        link = 'https://api.lyrics.ovh/v1/'+artist_name.replace(' ', '%20')+'/'+song_name.replace(' ', '%20')
