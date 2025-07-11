from django.shortcuts import render
from django.conf import settings
import requests
from .models import Project

def landing(request):
    return render(request, 'landing.html')

def about(request):
    return render(request, 'about.html')

def projects(request):
    projects = Project.objects.all()
    return render(request, 'projects.html', {'projects': projects})

def contact(request):
    return render(request, 'contact.html')

def form_submission(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        data = {
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": ["adelodunpeter69@gmail.com"],
            "subject": "New Contact Form Submission from Portfolio",
            "html": f"<p><strong>Name:</strong> {name}</p>"
                    f"<p><strong>Email:</strong> {email}</p>"
                    f"<p><strong>Message:</strong><br>{message}</p>"
        }

        headers = {
            "Authorization": f"Bearer {settings.RESEND_API_KEY}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(
                "https://api.resend.com/emails",
                headers=headers,
                json=data
            )

            if response.status_code in [200, 202]:
                return render(request, 'form_submission.html', {'success': True})
            else:
                return render(request, 'form_submission.html', {'error': response.text})

        except Exception as e:
            return render(request, 'form_submission.html', {'error': str(e)})

    return render(request, 'form_submission.html')
