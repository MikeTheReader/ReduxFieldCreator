from rest_framework import serializers
from models import Field, TYPES


class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = ('id', 'name', 'attribute', 'description',
                  'type', 'allow_additional_options', 'default_value', 'read_only')