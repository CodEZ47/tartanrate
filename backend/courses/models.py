from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Course(models.Model):
    course_name = models.CharField(max_length=100)
    course_code = models.CharField(max_length=10, unique=True)
    course_description = models.TextField()
    course_credits = models.IntegerField()
    course_prerequisites = models.TextField()
    course_semester = models.CharField(max_length=10)
    course_image_url = models.URLField(blank=True, null=True)
    professor_name = models.CharField(max_length=100)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    difficulty = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    hints = models.TextField()
    extra_resources = models.TextField()
    sylabus_url = models.URLField(blank=True, null=True)


    def __str__(self):
        return f"{self.course_name} by {self.professor_name}"
