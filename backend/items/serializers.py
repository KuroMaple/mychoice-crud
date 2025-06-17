from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Item
    fields = ['id', 'name', 'group', 'created_at', 'updated_at']

  def validate(self, data):
    name = data.get('name')
    group = data.get('group')
    if Item.objects.filter(name=name, group=group).exists():
      raise serializers.ValidationError(
        f"Item with name '{name}' already exists in group '{group}'."
      )
    return data