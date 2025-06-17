from django.db import models

class GroupChoices(models.TextChoices):
  PRIMARY = 'Primary'
  SECONDARY = 'Secondary'

class Item(models.Model):

  name = models.CharField(max_length=100)
  group = models.CharField(max_length=10, choices=GroupChoices.choices)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


  class Meta:
    unique_together = ('name', 'group')
    
  def __str__(self):
    return f"{self.name} ({self.group})"


