# Generated by Django 3.0.2 on 2020-05-18 20:13

from django.conf import settings
from django.db import migrations
import django.db.models.deletion
import filer.fields.image


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.FILER_IMAGE_MODEL),
        ('recipebook', '0003_auto_20200518_1842'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='recipe_img',
            field=filer.fields.image.FilerImageField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='recipe_img', to=settings.FILER_IMAGE_MODEL),
        ),
    ]