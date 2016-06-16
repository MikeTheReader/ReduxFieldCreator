from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import smart_text
from rest_framework import serializers
from models import Field, TYPES, FieldOptions


class CreatableSlugRelatedField(serializers.SlugRelatedField):

    def to_internal_value(self, data):
        try:
            return self.get_queryset().get_or_create(**{self.slug_field: data})[0]
        except ObjectDoesNotExist:
            self.fail('does_not_exist', slug_name=self.slug_field, value=smart_text(data))
        except (TypeError, ValueError):
            self.fail('invalid')


class FieldSerializer(serializers.ModelSerializer):

    options = CreatableSlugRelatedField(many=True, slug_field="option", required=False, queryset=FieldOptions.objects.all(), allow_null=True)

    class Meta:
        model = Field
        fields = ('id', 'name', 'attribute', 'description',
                  'type', 'allow_additional_options', 'default_value', 'read_only', 'options')