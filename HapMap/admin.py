from django.contrib import admin
from .models import Recipes, RecipeDetails, Categories, Ingredient, Units
from tinymce.widgets import TinyMCE
from django.db import models

class ReceptDetailsAdmin(admin.StackedInline):
    model = RecipeDetails

class RecipesAdmin(admin.ModelAdmin):
    formfield_overrides =  {
        models.TextField: {'widget': TinyMCE}
    }
    inlines = [
        ReceptDetailsAdmin
    ]

admin.site.register(Recipes, RecipesAdmin)
admin.site.register(Categories)
admin.site.register(Ingredient)
admin.site.register(Units)