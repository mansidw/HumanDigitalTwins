from django.db import models

# Create your models here.

class Jobs(models.Model):
    skill = models.CharField(max_length = 250)
    job = models.CharField(max_length = 350)