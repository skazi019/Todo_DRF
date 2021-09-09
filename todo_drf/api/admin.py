from django.contrib import admin
from django.db import models
from .models import Task

# Register your models here.
class TaskModel(admin.ModelAdmin):
    model = Task

admin.site.register(TaskModel)