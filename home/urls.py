from django.urls import path
from . import views

app_name = "home"

urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('detail/<int:pk>/', views.DetailView.as_view(), name="detail"),
    path('detail/<int:pk>/like/', views.DetailLikeView.as_view(), name="detail_like"),
    path('returnMixedSound/', views.ReturnMixedSoundView.as_view(), name="return_mixed"),
]