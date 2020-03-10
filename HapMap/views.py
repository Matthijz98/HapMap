from django.shortcuts import render
from django.http import HttpResponse, request, Http404
from .models import Recipe, RecipeDetail, Ingredient, Alt_Ingeredient, Alergie
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
    def allergies(a):
        allergiesstring = []
        for b in a.values_list():
            allergiesstring.append(str(b[1]))
        return ', '.join(allergiesstring)

    persons = request.GET.get("persons", "")
    if (persons == ''):
        persons = 0
    recipe = request.GET.get("recipe", "")
    search_qs = RecipeDetail.objects.filter(recipe_id=recipe)
    results = []
    for r in search_qs:
        ingredient = Ingredient.objects.get(id=r.ingredient_id)
        results.append({
            "name": ingredient.ingredient_name,
            "allergies": str(allergies(ingredient.allergies)),
            "amount_per_person": str(r.amount).replace('.', ','),
            "amount_total": str(float(r.amount) * int(persons)).replace('.', ','),
            "unit": str(r.unit)
        })
    data = json.dumps(results)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)


def recipeIngredientAllergie(request):
    total = 0

    def calctotal(ammount):
        total = 0
        for a in ammount.values():
            total += int(a)
        return total

    def calcallergie(recipedetails, ingredient, allergies):
        # Make empty result opject
        result = dict()
        result['json'] = []
        # Calculate the total amount of persons
        total = calctotal(ammounts)
        # loop trough the allergies
        for allergie in ingredient_info.allergies.values_list():
            try:
                alt_ingredient = Alt_Ingeredient.objects.get(for_recipe_detail=recipedetails.id, for_allergie_id=allergie[0])
                result['json'].append({
                    'name': str(alt_ingredient.alt_ingredient.ingredient_name),
                    'amount_per_person': str(alt_ingredient.amount),
                    'amount_total': str(int(ammounts.get(allergie[1].lower())) * recipedetails.amount),
                    'unit': str(alt_ingredient.unit),
                    'for_allergie': str(allergie[1]).lower()
                })
                total -= int(ammounts.get(allergie[1].lower()))
            except Alt_Ingeredient.DoesNotExist:
                result['json'].append({
                    'name': "Geen opgegeven",
                    'amount_per_person': 0,
                    'amount_total': 0,
                    'unit': "",
                    'for_allergie': str(allergie[1]).lower()
                })
        result['total'] = total
        return result

    # Get the allegies from the url and remove the recipe key value
    ammounts = request.GET.dict()
    del ammounts['recipe']

    recipe = request.GET.get("recipe", "")
    recipedetail = RecipeDetail.objects.filter(recipe_id=recipe)
    results = []
    for ingredient in recipedetail:
        ingredient_info = Ingredient.objects.get(id=ingredient.ingredient_id)
        alt = calcallergie(ingredient, ingredient_info, ammounts)
        results.append({
            "name": ingredient_info.ingredient_name,
            "unit": str(ingredient.unit),
            "amount_per_person": str(ingredient.amount).replace('.', ','),
            "amount_total": str(ingredient.amount * alt['total']).replace('.', ','),
            "alternatives": alt['json']
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

