import React, { useState } from 'react';
import { Container, Card, CardItem, Text, Spinner, Right, Button, Toast, Item, Input, Label, Left } from 'native-base';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import moment from 'moment';

import { useSubscription, useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';

import { RootStackParamList } from "../../routes";
import ProductList from "../productList";

const GET_SHOPPING_LIST = gql`
subscription teste($id: uuid!){  
	shopping_list_by_pk(id: $id ) {
    id
    name
    created_at
    status
    products(order_by: {name: asc}) {
      id
      name
      ammount
      price
      shopping_list_id
    }
  }
}
`
const DELETE_SHOPPING_LIST = gql`
mutation deleteShoppingList($id: uuid!) {
  delete_shopping_list(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
`

const EditShoppingList = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'editList'>>()
  const navigation = useNavigation()

  const [ name, setName ] = useState()

  const { loading, error, data } = useSubscription(GET_SHOPPING_LIST, {
    variables: {
      id: route.params!.id
    }
  })

  const [deleteShoppingList, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_SHOPPING_LIST, {
    onCompleted: () => changePageDelete(),
    onError: () => handleDeleteError()
  }) 
  
  const handleDeleteError = () => {
    Toast.show({
      text: "Erro ao deletar lista",
      position: "bottom",
      type: "danger",
      duration: 2000
    })
  }

  const changePageDelete = () => {
    navigation.navigate('shoppingList')
    Toast.show({
      text: "Lista deletada com sucesso",
      position: "bottom",
      type: "success",
      duration: 2000
    })
  }

  const handleSubmit = () => {
    deleteShoppingList({ variables: { id: route.params!.id} })
  }

  if (loading) return <Container><Text>Carregando lista de compras...</Text><Spinner /></Container>
  if (deleteLoading) return <Container><Text>Deletando lista de compras...</Text><Spinner /></Container>
  if (error) return <Text>Error</Text>

  const { shopping_list_by_pk } = data;


  return (
    <Container style={{ paddingHorizontal: 10 }}>
        <Card style={{marginBottom: 10}}>
        <CardItem header bordered>
          <Item stackedLabel>
            <Label>Nome da lista</Label>
            <Input placeholder="Nome da Lista" defaultValue={shopping_list_by_pk.name} value={name} onChangeText={value => { setName(value) }} />
          </Item>

          </CardItem>
          <CardItem >
            <Left>
              <Text note>
                Criação: {moment(shopping_list_by_pk.created_at).format('Do MMMM YYYY')}
                {shopping_list_by_pk.status}
              </Text>
            </Left>
          <Right>
            <Button onPress={handleSubmit} small danger style={{width: 40, justifyContent: 'center'}}>
              <Ionicons name='md-trash' size={20} color={'white'} />
            </Button>
          </Right>
          </CardItem>
        </Card>
        <ProductList products={shopping_list_by_pk.products} shopping_list_id={shopping_list_by_pk.id} />
    </Container>
  )
}

export default EditShoppingList