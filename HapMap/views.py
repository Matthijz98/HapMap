from django.shortcuts import render
from django.http import HttpResponse, request, Http404
from .models import Recipe, RecipeDetail, Ingredient
import json


def homepage(request):
    return render(request=request,
                  template_name="HapMap/home.html",
                  context={"recipes": Recipe.objects.all, "recipe_count": Recipe.objects.count()})


def receptSearch(request):
    q = request.GET.get('q', '')
    search_qs = Recipe.objects.filter(recipe_title__icontains=q)[:10]
    results = []
    for r in search_qs:
        results.append({"name": r.recipe_title, "url": str("/recipe/" + str(r.id))})
    data = json.dumps(results)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)


def recipeIngredient(request):
    persons = request.GET.get("persons", "")
    if (persons == ''):
        persons = 0
    recipe = request.GET.get("recipe", "")
    search_qs = RecipeDetail.objects.filter(recipe_id=recipe)
    results = []
    for r in search_qs:
        results.append({
            "name": Ingredient.objects.get(id=r.ingredient_id).ingredient_name,
            "amount_per_person": str(r.amount).replace('.', ','),
            "amount_total": str(float(r.amount) * int(persons)).replace('.', ','),
            "unit": str(r.unit)
        })
    data = json.dumps(results)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)


def recipeDetails(request, recipeId):
    try:
        recipe = Recipe.objects.get(id=recipeId)
    except Recipe.DoesNotExist:
        raise Http404("Recipe not found")
    return render(request=request,
                  template_name="HapMap/recipe.html",
                  context={"recipe": recipe})


def recipes(request):
    cat = request.GET.get("cat", '')
    if cat == '':
        context = Recipe.objects.all().order_by('?')
    else:
        context = Recipe.objects.all().order_by('?').filter(recipe_categorie__categorie_name=cat)
    return render(request=request,
                  template_name="HapMap/recipes.html",
                  context={"recipes": context})


def adsview(request):
    line = "google.com, pub-1287147359957350, DIRECT, f08c47fec0942fa0"
    return HttpResponse(line)