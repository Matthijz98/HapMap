from django.test import SimpleTestCase
from django.urls import reverse, resolve
from HapMap.views import homepage, receptSearch, recipeIngredient, recipeDetails, recipes


class TestUrls(SimpleTestCase):
    def test_home_url_resolves(self):
        url = reverse('homepage')
        self.assertEquals(resolve(url).func, homepage)

    def test_receptSearch_url_resolves(self):
        url = reverse('ajax/receptSearch')
        self.assertEquals(resolve(url).func, receptSearch)

    def test_recipeIngredient_url_resolves(self):
        url = reverse('ajax/recipe_ingredient')
        self.assertEquals(resolve(url).func, recipeIngredient)

    def test_recipe_url_resolves(self):
        url = reverse('recipe', args=['1'])
        self.assertEquals(resolve(url).func, recipeDetails)

    def test_recipes_url_resolves(self):
        url = reverse('recipes')
        self.assertEquals(resolve(url).func, recipes)

