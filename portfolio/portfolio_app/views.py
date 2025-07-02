from django.shortcuts import render, redirect
from django.http import HttpResponse

def landing(request):
    return render(request, 'landing.html', {'title': 'My Portfolio - Home'})

def about(request):
    return render(request, 'about.html', {'title': 'My Portfolio - About'})

def projects(request):
    return render(request, 'projects.html', {'title': 'My Portfolio - Projects'})

def contact(request):
    return render(request, 'contact.html', {'title': 'My Portfolio - Contact'})
