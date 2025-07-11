from django.shortcuts import render
from .models import Project
import requests
from django.conf import settings

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

        print("Sending Resend Email with headers:", headers)
        print("Payload:", data)

        try:
            response = requests.post(
                "https://api.resend.com/emails",
                headers=headers,
                json=data
            )

            print("Resend Response Status:", response.status_code)
            print("Resend Response Body:", response.text)

            if response.status_code in [200, 202]:
                return render(request, 'form_submission.html', {
                    'title': 'My Portfolio - Form Submission',
                    'success': True
                })
            else:
                return render(request, 'form_submission.html', {
                    'title': 'My Portfolio - Form Submission',
                    'error': response.text
                })

        except Exception as e:
            print("Exception during Resend request:", str(e))
            return render(request, 'form_submission.html', {
                'title': 'My Portfolio - Form Submission',
                'error': str(e)
            })

    return render(request, 'form_submission.html', {
        'title': 'My Portfolio - Form Submission'
    })
