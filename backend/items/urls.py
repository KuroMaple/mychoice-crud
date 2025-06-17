from django.urls import path
from .views import ItemListCreateView, ItemRetrieveUpdateView

urlpatterns = [
  path('items/', ItemListCreateView.as_view(), name='item-list-create'),
  path('items/<int:pk>/', ItemRetrieveUpdateView.as_view(), name='item-retrieve-update'),
]
