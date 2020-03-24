from django.db import models
from django.conf import settings


class Categorie(models.Model):
    categorie_name = models.CharField(max_length=255)
    categorie_img = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.categorie_name


class Recipe(models.Model):
    recipe_title = models.CharField(max_length=255)
    recipe_description = models.TextField(blank=True, null=True)
    recipe_img = models.CharField(max_length=255, blank=True, null=True)
    recipe_tip = models.TextField(blank=True)
    recipe_categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)


class Unit(models.Model):
    unit_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.unit_name


class Alergie(models.Model):
    allergie_name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return str(self.allergie_name)


class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=255)
    allergies = models.ManyToManyField(Alergie, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.ingredient_name


class Webshop(models.Model):
    webshop_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.webshop_name


class IngredientDetails(models.Model):
    ingredient_name = models.CharField(max_length=255)
    ingredient_description = models.TextField(blank=True, null=True)
    ingredient_price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    ingredient_webshop = models.ForeignKey(Webshop, on_delete=models.CASCADE, blank=True, null=True)
    ingredient_ammount = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.ingredient_name


class RecipeDetail(models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=3)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return str(self.ingredient)


class Alt_Ingeredient(models.Model):
    for_recipe_detail = models.ForeignKey(RecipeDetail, on_delete=models.CASCADE)
    alt_ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    for_allergie = models.ForeignKey(Alergie, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
