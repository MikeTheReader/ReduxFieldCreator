"""redux_field_creator URL Configuration"""
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import RedirectView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^fields/', include('fields.urls')),
]
