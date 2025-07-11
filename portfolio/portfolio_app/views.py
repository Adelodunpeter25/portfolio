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
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        message = request.POST.get('message', '').strip()

        if not all([name, email, message]):
            return render(request, 'form_submission.html', {
                'error': 'All fields are required.'
            })

        if not settings.RESEND_API_KEY:
            return render(request, 'form_submission.html', {
                'error': 'Email service is not configured.'
            })

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
                json=data,
                timeout=10
            )

            if response.status_code in [200, 202]:
                return render(request, 'form_submission.html', {'success': True})
            else:
                return render(request, 'form_submission.html', {
                    'error': 'Failed to send message. Please try again.'
                })

        except requests.exceptions.RequestException:
            return render(request, 'form_submission.html', {
                'error': 'Network error. Please try again later.'
            })
        except Exception:
            return render(request, 'form_submission.html', {
                'error': 'An unexpected error occurred. Please try again.'
            })

    return render(request, 'form_submission.html')
