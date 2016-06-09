from django.shortcuts import render

from models import Field
from serializers import FieldSerializer

from rest_framework import viewsets


class FieldViewSet(viewsets.ModelViewSet):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer


def index(request):
    return render(request, 'fields/index.html', {})
