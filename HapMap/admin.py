from django.contrib import admin
from .models import Recipes, RecipeDetails, Categories, Ingredient, Units, Alt_Ingeredient
from tinymce.widgets import TinyMCE
from django.db import models
import nested_admin


class IngredientAdmin(admin.ModelAdmin):
    search_fields = ['ingredient_name']


class AltAdmin(nested_admin.NestedStackedInline):
    model = Alt_Ingeredient


class ReceptDetailsAdmin(nested_admin.NestedStackedInline):
    model = RecipeDetails
    autocomplete_fields = ['ingredient']
    inlines = [AltAdmin]


class RecipesAdmin(nested_admin.NestedModelAdmin):
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