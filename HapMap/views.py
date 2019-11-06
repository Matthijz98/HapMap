from django.shortcuts import render
from django.http import HttpResponse, request
from .models import Recipes
import json

def homepage(request):
    return render(request=request,
                  template_name="HapMap/home.html",
                  context={"recipes": Recipes.objects.all})


def receptSearch(request):
    q = request.GET.get('q', '')
    search_qs = Recipes.objects.filter(recipe_title__contains=q)
    results = []
    print(q)
    for r in search_qs:
        results.append(str(r))
    data = json.dumps(results)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)
