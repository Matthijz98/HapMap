from django.contrib import admin
from .models import Recipe, RecipeDetail, Categorie, Ingredient, Unit, Alt_Ingeredient, Alergie
from tinymce.widgets import TinyMCE
from django.db import models
import nested_admin


class IngredientAdmin(admin.ModelAdmin):
    search_fields = ['ingredient_name']


class AltAdmin(nested_admin.NestedStackedInline):
    model = Alt_Ingeredient
    autocomplete_fields = ['ingredient']
    extra = 0


class ReceptDetailsAdmin(nested_admin.NestedStackedInline):
    model = RecipeDetail
    autocomplete_fields = ['ingredient']
    inlines = [AltAdmin]
    extra = 1


class RecipesAdmin(nested_admin.NestedModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE}
    }
    inlines = [
        ReceptDetailsAdmin
    ]


admin.site.register(Recipe, RecipesAdmin)
admin.site.register(Categorie)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Unit)
admin.site.register(Alergie)