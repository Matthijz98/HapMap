from django.contrib import admin
from .models import Recipes, RecipeDetails, Categories, Ingredient, Units
from tinymce.widgets import TinyMCE
from django.db import models

class IngredientAdmin(admin.ModelAdmin):
    search_fields = ['ingredient_name']

class ReceptDetailsAdmin(admin.StackedInline):
    model = RecipeDetails
    autocomplete_fields = ['ingredient']

class RecipesAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE}
    }
    inlines = [
        ReceptDetailsAdmin
    ]


admin.site.register(Recipes, RecipesAdmin)
admin.site.register(Categories)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Units)