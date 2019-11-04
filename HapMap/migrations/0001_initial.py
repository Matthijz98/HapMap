# Generated by Django 2.2.6 on 2019-11-01 17:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categorie_name', models.CharField(max_length=255)),
                ('categorie_img', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ingredient_name', models.CharField(max_length=255)),
                ('ingredient_description', models.TextField(blank=True, null=True)),
                ('ingredient_price', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('ingredient_ammount', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ingredients',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ingredient_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Units',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Webshop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('webshop_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Recipes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipe_title', models.CharField(max_length=255)),
                ('recipe_description', models.TextField(blank=True, null=True)),
                ('recipe_img', models.CharField(blank=True, max_length=255, null=True)),
                ('recipe_tip', models.TextField(blank=True)),
                ('recipe_categorie', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='HapMap.Categories')),
            ],
        ),
        migrations.CreateModel(
            name='RecipeDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=6)),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='HapMap.Ingredient')),
                ('recipe_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='HapMap.Recipes')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='HapMap.Units')),
            ],
        ),
        migrations.AddField(
            model_name='ingredient',
            name='ingredient_webshop',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='HapMap.Webshop'),
        ),
    ]
