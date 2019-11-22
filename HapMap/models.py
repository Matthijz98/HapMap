from django.db import models

class Categories(models.Model):
    categorie_name = models.CharField(max_length=255)
    categorie_img = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.categorie_name

class Recipes(models.Model):
    recipe_title = models.CharField(max_length=255)
    recipe_description = models.TextField(blank=True, null=True)
    recipe_img = models.CharField(max_length=255, blank=True, null=True)
    recipe_tip = models.TextField(blank=True)
    recipe_categorie = models.ForeignKey(Categories, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.recipe_title

class Units(models.Model):
    unit_name = models.CharField(max_length=255)

    def __str__(self):
        return self.unit_name

class Ingredients(models.Model):
    ingredient_name = models.CharField(max_length=255)

    def __str__(self):
        return self.ingredient_name

class Webshop(models.Model):
    webshop_name = models.CharField(max_length=255)

    def __str__(self):
        return self.webshop_name

class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=255)
    ingredient_description = models.TextField(blank=True, null=True)
    ingredient_price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    ingredient_webshop = models.ForeignKey(Webshop, on_delete=models.CASCADE, blank=True, null=True)
    ingredient_ammount = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.ingredient_name

class RecipeDetails(models.Model):
    recipe_id = models.ForeignKey(Recipes, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=3)
    unit = models.ForeignKey(Units, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.ingredient)