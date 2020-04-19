from django.shortcuts import render, HttpResponse
from django.views import generic
import os

from .models import Music, Recording

class IndexView(generic.TemplateView):
    template_name = "home/index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['music_list'] = Music.objects.all()
        return context

class DetailView(generic.View):
    def get(self, request, pk):
        obj = Recording.objects.get(pk=pk)
        return render(request, "home/detail.html", {'object': obj})

class DetailLikeView(generic.View):
    def post(self, request, pk):
        grabbed_record = Recording.objects.get(pk=request.POST['obj_pk'])
        grabbed_record.likes = grabbed_record.likes + 1
        grabbed_record.save()
        return HttpResponse(grabbed_record.likes)

class ReturnMixedSoundView(generic.View):
    def post(self, request):
        # Getting Reference to Music
        music = Music.objects.get(pk=int(request.POST['pk']))
        # Creating the recording object
        new_recording = Recording()
        new_recording.music = music
        new_recording.voice_record = request.FILES['soundBlob']
        new_recording.save()
        new_recording.instantiate()
        new_recording.save()
        return HttpResponse(new_recording.merged_record)