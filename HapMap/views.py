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


def recipeIngredientAllergie(request):
    def calctotal(ammount):
        total = 0
        for a in ammount.values():
            total += int(a)
        return total

    def calcallergie(recipedetails, ingredient, allergies):
        result = []
        total = calctotal(ammounts)
        # First calc the total amount of persons
        for allergie in ingredient_info.allergies.values_list():
            print(allergie[1])
            result.append({allergie[1]: str(int(ammounts.get(allergie[1].lower())) * recipedetails.amount)})
            total -= int(ammounts.get(allergie[1].lower()))
        result.append({'none': str(total * recipedetails.amount)})
        return result

    # Get the allegies from the url and remove the recipe key value
    ammounts = request.GET.dict()
    del ammounts['recipe']

    recipe = request.GET.get("recipe", "")
    search_qs = RecipeDetail.objects.filter(recipe_id=recipe)
    results = []
    for ingredient in search_qs:
        ingredient_info = Ingredient.objects.get(id=ingredient.ingredient_id)
        results.append({
            "name": ingredient_info.ingredient_name,
            "amount": calcallergie(ingredient, ingredient_info, ammounts),
            "unit": str(ingredient.unit)
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

def recipe_allergies(request):

    ingredients = RecipeDetail.objects.all().filter(recipe_id=request.GET.get("recipe", ''))
    results = []
    for ingredient in ingredients:
        for allergie in Ingredient.objects.get(id=ingredient.ingredient_id).allergies.values():
            if allergie in results:
                pass
            else:
                results.append({
                    "allgerie": allergie
                })
    # remove duplicates
    res_list = []
    for i in range(len(results)):
        if results[i] not in results[i + 1:]:
            res_list.append(results[i])
    data = json.dumps(res_list)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)

