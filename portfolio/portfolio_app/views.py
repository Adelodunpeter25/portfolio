from django.shortcuts import render
from .models import Project

def landing(request):
    return render(request, 'landing.html', {'title': 'My Portfolio - Home'})

def about(request):
    return render(request, 'about.html', {'title': 'My Portfolio - About'})

def projects(request):
    projects = Project.objects.all()
    return render(request, 'projects.html', {'title': 'My Portfolio - Projects', 'projects': projects})

def contact(request):
    return render(request, 'contact.html', {'title': 'My Portfolio - Contact'})

def form_submission(request):
    return render(request, 'form_submission.html', {'title': 'My Portfolio - Form Submission'})
