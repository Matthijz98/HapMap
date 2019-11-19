from django.shortcuts import render
from django.http import HttpResponse, request
from .models import Recipes, RecipeDetails, Ingredient
import json

def homepage(request):
    return render(request=request,
                  template_name="HapMap/home.html",
                  context={"recipes": Recipes.objects.all, "recipe_count": Recipes.objects.count()})


def receptSearch(request):
    q = request.GET.get('q', '')
    search_qs = Recipes.objects.filter(recipe_title__icontains=q)
    results = []
    for r in search_qs:
        results.append({"name": r.recipe_title, "url": str("/recipe/" + str(r.id))})
    data = json.dumps(results)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)

def recipeIngredient(request):
    persons = request.GET.get("persons", "")
    recipe = request.GET.get("recipe", "")
    search_qs = RecipeDetails.objects.filter(recipe_id=recipe)
    results = []
    for r in search_qs:
        results.append({"name": Ingredient.objects.get(id=r.ingredient_id).ingredient_name, "amount_per_person": str(r.amount), "amount_total":str(float(r.amount) * int(persons)), "unit": str(r.unit)})
    data = json.dumps(results)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)

def recipeDetails(request, recipeId):
    return render(request=request,
                  template_name="HapMap/recipe.html",
                  context={"recipe": Recipes.objects.get(id=recipeId)})

def recipes(request):
    return render(request=request,
                  template_name="HapMap/recipes.html",
                  context={"recipes": Recipes.objects.all()})