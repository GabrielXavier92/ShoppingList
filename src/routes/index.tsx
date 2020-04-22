import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShoppingList from '../components/shoppingLists'
import EditShoppingList from '../components/editShoppingList'
import NewShoppingList from '../components/newShoppingList'
import ProductForm from '../components/productForm'

export type RootStackParamList = {
  shoppingList: {};
  newShoppingList: {},
  editList: { id: string };
  productForm: { shopping_list_id?: string, item?: { name: string, ammount?: number, price?: number, id: string } }
};

const Stack = createStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="shoppingList"
        component={ShoppingList}
        options={{ title: 'Listas de Compras' }}
      />
      <Stack.Screen
        name="newShoppingList"
        component={NewShoppingList}
        options={{ title: 'Nova lista de compras' }}
      />
      <Stack.Screen
        name="editList"
        component={EditShoppingList}
        options={{ title: 'Editar Lista' }}
      />
      <Stack.Screen
        name="productForm"
        component={ProductForm}
        options={{ title: 'Editar Produto' }}
      />
    </Stack.Navigator>
  )
}