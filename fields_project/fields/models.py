from __future__ import unicode_literals

from django.db import models
from jsonfield import JSONField

TYPES = [
    ('text', 'text'),
    ('number', 'number'),
    ('date', 'date'),
    ('boolean', 'boolean')
]


class Field(models.Model):
    label = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    instructions = models.TextField(null=True, blank=True)
    type = models.CharField(choices=TYPES, default='text', max_length=255)
    allow_additional_options = models.BooleanField(default=False)
    default_value = models.CharField(null=True, max_length=255)
    read_only = models.BooleanField(default=False)
    required = models.BooleanField(default=True)
    min = models.TextField(default=None, null=True, blank=True)
    max = models.TextField(default=None, null=True, blank=True)


class FieldOptions(models.Model):
    field = models.ForeignKey(Field, related_name="options", null=True, blank=True)
    option = models.CharField(max_length=255)

    def __unicode__(self):
        return '{0}'.format(self.option)




