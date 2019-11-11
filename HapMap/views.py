from django.shortcuts import render
from django.http import HttpResponse, request
from .models import Recipes
import json

def homepage(request):
    return render(request=request,
                  template_name="HapMap/home.html",
                  context={"recipes": Recipes.objects.all, "recipe_count": Recipes.objects.count()})


def receptSearch(request):
    q = request.GET.get('q', '')
    search_qs = Recipes.objects.filter(recipe_title__icontains=q)
    results = []
    print(q)
    for r in search_qs:
        results.append({"name": r.recipe_title, "url": str("/recipe/" + str(r.id))})
    data = json.dumps(results)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)

def recipeDetails(request, recipeId):
    return render(request=request,
                  template_name="HapMap/recipe.html",
                  context={"recipe": Recipes.objects.get(id=recipeId)})