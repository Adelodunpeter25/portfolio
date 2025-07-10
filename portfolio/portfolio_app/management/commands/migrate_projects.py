from django.core.management.base import BaseCommand
from portfolio_app.models import Project

class Command(BaseCommand):
    help = 'Migrate hardcoded projects into the database'

    def handle(self, *args, **kwargs):
        projects_data = [
            {
                'title': 'Pyshop',
                'description': 'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and many other features.',
                'link': 'http://pyshop1.onrender.com',
                'github_link': 'https://github.com/Adelodunpeter25',
                'icon_class': 'fas fa-shopping-cart',
            },
            {
                'title': 'Postnet',
                'description': 'A basic blog platform with categorization, account customizaton, port making and many other features.',
                'link': '#',
                'github_link': '#',
                'icon_class': 'fas fa-chart-line',
            },
            {
                'title': 'Task Manager',
                'description': 'A simple taskmanagement system with project catogorization, task assignment, progress tracking among other features.',
                'link': '#',
                'github_link': '#',
                'icon_class': 'fas fa-tasks',
            },
        ]

        for proj in projects_data:
            project, created = Project.objects.get_or_create(
                title=proj['title'],
                defaults={
                    'description': proj['description'],
                    'link': proj['link'],
                    'github_link': proj['github_link'],
                    'icon_class': proj['icon_class'],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created project: {project.title}"))
            else:
                self.stdout.write(f"Project already exists: {project.title}")
