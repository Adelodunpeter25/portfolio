from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio_app.urls')),
    path('contact/', include('portfolio_app.urls')),
]
