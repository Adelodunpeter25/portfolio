from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'link', 'github_link', 'icon_class')
    search_fields = ('title', 'description')
    exclude = ('image',)
    
    
# Register your models here.
