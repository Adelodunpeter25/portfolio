from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name='landing'),
    path('about/', views.about, name='about'),
    path('projects/', views.projects, name='projects'),
    path('contact/', views.contact, name='contact'),
    path('landing/', views.landing, name='home'),
    path('contact/contact/form_submission', views.form_submission, name='form_submission'),
]