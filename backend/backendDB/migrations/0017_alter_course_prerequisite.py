# Generated by Django 5.1.3 on 2024-12-28 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendDB', '0016_course_prerequisite'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='prerequisite',
            field=models.ManyToManyField(blank=True, to='backendDB.course'),
        ),
    ]
