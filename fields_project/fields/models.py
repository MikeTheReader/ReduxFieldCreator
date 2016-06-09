from __future__ import unicode_literals

from django.db import models

TYPES = [
    ('text', 'text'),
    ('number', 'number'),
    ('date', 'date'),
]


class Field(models.Model):
    name = models.CharField(max_length=255)
    attribute = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(choices=TYPES, default='text', max_length=255)
    allow_additional_options = models.BooleanField(default=False)
    default_value = models.CharField(null=True, max_length=255)
    read_only = models.BooleanField(default=False)


