from django.contrib import admin
from .models import Recipe, RecipeDetail, Categorie, Ingredient, Unit, Alt_Ingeredient, Alergie
from tinymce.widgets import TinyMCE
from django.db import models
import nested_admin


class IngredientAdmin(admin.ModelAdmin):
    ordering = ["ingredient_name"]
    search_fields = ['ingredient_name']


class AltIngredientAdmin(admin.ModelAdmin):
    ordering = ["ingredient_name"]
    search_fields = ["ingredient_name"]


class AltAdmin(nested_admin.NestedTabularInline):
    model = Alt_Ingeredient
    autocomplete_fields = ['alt_ingredient']
    extra = 0


class ReceptDetailsAdmin(nested_admin.NestedTabularInline):
    model = RecipeDetail
    autocomplete_fields = ['ingredient']
    inlines = [AltAdmin]
    extra = 1


class RecipesAdmin(nested_admin.NestedModelAdmin):
    list_display = ('recipe_title', 'recipe_categorie', "updated_at", "created_at", "added_by")
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE}
    }
    inlines = [
        ReceptDetailsAdmin
    ]
    exclude = ['added_by', ]

    def save_model(self, request, obj, form, change):
        obj.added_by = request.user
        super().save_model(request, obj, form, change)


admin.site.register(Recipe, RecipesAdmin)
admin.site.register(Categorie)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Unit)
admin.site.register(Alergie)