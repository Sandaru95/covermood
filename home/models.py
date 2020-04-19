from django.db import models

from pydub import AudioSegment
from pydub.playback import play

import random
import os

class Music(models.Model):
    name = models.CharField(max_length=1000)
    artist = models.CharField(max_length=1000)
    mp3 = models.FileField(upload_to="music/")
    cover = models.ImageField(upload_to="cover/")
    lyrics = models.TextField(max_length=5000)
    duration_minutes = models.IntegerField(default=0)
    duration_seconds = models.IntegerField(default=0)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name[:50]

class Recording(models.Model):
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    voice_record = models.FileField(upload_to='sound_record/')
    merged_record = models.CharField(max_length=1000, blank=True, null=True)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return str(self.music.name[:100])

    def instantiate(self):
        music_1 = AudioSegment.from_file(os.path.join(os.getcwd(), self.music.mp3.url[1:]))
        record_2 = AudioSegment.from_file(os.path.join(os.getcwd(), self.voice_record.url)[1:])
        music_1 -= 20
        record_2 += 10
        combined = music_1.overlay(record_2)
        combined_randint = random.randint(1, 10000000000000000000000000000)
        combined_filepath = os.path.join(os.getcwd(), f"media/merged_record/{combined_randint}.wav")
        combined.export(combined_filepath, format="wav")

        self.merged_record = f"/media/merged_record/{combined_randint}.wav"
