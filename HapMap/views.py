from django.shortcuts import render
from django.http import HttpResponse, request
from .models import Recipes

def homepage(request):
    return render(request=request,
                  template_name="HapMap/home.html",
                  context={"recipes": Recipes.objects.all})

