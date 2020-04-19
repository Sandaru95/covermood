from django.shortcuts import redirect
from django.views import generic

class ReturnToHome(generic.View):
    def get(self, request):
        return redirect('home:index')