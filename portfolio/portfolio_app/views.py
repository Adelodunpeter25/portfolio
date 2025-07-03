import email
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def landing(request):
    return render(request, 'landing.html', {'title': 'My Portfolio - Home'})

def about(request):
    return render(request, 'about.html', {'title': 'My Portfolio - About'})

def projects(request):
    return render(request, 'projects.html', {'title': 'My Portfolio - Projects'})

def contact(request):
    return render(request, 'contact.html', {'title': 'My Portfolio - Contact'})

def form_submission(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        if name and email and message:
            return HttpResponse("Thank you! Your message has been sent.")
        else:
            return HttpResponse("Please fill out all fields.", status=400)

    return render(request, 'form_submission.html', {'title': 'My Portfolio - Form Submission'})
