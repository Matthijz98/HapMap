"""HapMap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.homepage, name="homepage"),
    path('admin/', admin.site.urls),
    path('tinymce/', include('tinymce.urls')),
    path('ajax_calls/search/', views.receptSearch, name="ajax/receptSearch"),
    path('ajax_calls/recipe_ingredient/', views.recipeIngredient, name="ajax/recipe_ingredient"),
    path('ajax_calls/recipe_ingredient/allergie/', views.recipeIngredientAllergie, name="ajax/recipe_ingredient/allergie"),
    path('ajax_calls/allergies/', views.recipe_allergies),
    path('recipe/<int:recipeId>', views.recipeDetails, name="recipe"),
    path('recipes/', views.recipes, name="recipes"),
    path('ads.txt', views.adsview),
    path(r'^_nested_admin/', include('nested_admin.urls')),
]
