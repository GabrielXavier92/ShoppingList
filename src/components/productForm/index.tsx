import React, { useState, useEffect } from 'react';

import { Container, Form, Item, Input, Button, Text, List, Spinner, Label, Toast } from 'native-base';
import NumericInput from 'react-native-numeric-input'

import { useMutation } from "@apollo/react-hooks";
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import gql from "graphql-tag";

import { RootStackParamList } from "../../routes";

const INSERT_PRODUCT = gql`
mutation ($shopping_list_id: uuid!, $name: String!, $price: numeric, $ammount: numeric) {
  insert_product(objects: {name: $name, price: $price, shopping_list_id: $shopping_list_id, ammount: $ammount}) {
    affected_rows
  }
}
`

const UPDATE_PRODUCT = gql`
mutation ($id: uuid!, $name: String!, $price: numeric, $ammount: numeric){
  update_product(where: {id: {_eq: $id}}, _set: {name: $name, price: $price, ammount: $ammount}) {
    affected_rows
  }
}
`

const ProductForm = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'productForm'>>()
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [ammount, setAmmount] = useState(0.0)
  const [price, setPrice] = useState(0.0)

  const handlePopualteForm = () => {
    if (route.params!.item) {
      const { name, ammount, price } = route.params!.item
      setName(name)
      setAmmount(ammount!)
      setPrice(price!)
    }
  }

  useEffect(handlePopualteForm, [])

  const [insertProduct, { loading, error }] = useMutation(INSERT_PRODUCT, {
    onCompleted: () => changePage(),
    onError: () => handleError()
  })

  const [updateProduct, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => changePage(),
    onError: () => handleError()
  })

  const changePage = () => {
    Toast.show({
      text: "Produto criado/atualizado com sucesso",
      position: "bottom",
      type: "success",
      duration: 2000
    })
    navigation.goBack()
  }

  const handleError = () => {
    Toast.show({
      text: "Erro ao criar/editar produto",
      position: "bottom",
      type: "danger",
      duration: 2000
    })
  }

  const handleSubmit = () => {
    if (route.params!.shopping_list_id) {
      insertProduct({
        variables: {
          shopping_list_id: route.params!.shopping_list_id,
          name,
          ammount,
          price
        }
      })      
    } else if (route.params!.item) {
      updateProduct({
        variables: {
          id: route.params!.item!.id,
          name,
          ammount,
          price
        }
      })
    }
  }


  if (loading || updateLoading ) return <Spinner />

  return (
    <Container style={{ paddingHorizontal: 20, paddingTop: 20 }}>
      <Form>
        <List>
          <Item floatingLabel style={{ paddingVertical: 5}}>
            <Label>Nome</Label>
            <Input placeholder="Nome da Lista" value={name} onChangeText={value => { setName(value) }} />
          </Item>
          <Item style={{ paddingVertical: 5, justifyContent: 'space-between'}}>
            <Label>Quantidade</Label>
            <NumericInput
              value={ammount}
              initValue={ammount}
              onChange={value => { setAmmount(value) }}
              totalHeight={45}
              minValue={0}
              valueType={'real'}
            />
          </Item>
          <Item style={{ paddingVertical: 5, justifyContent: 'space-between' }}>
            <Label>Preço</Label>
            <NumericInput
              value={price}
              initValue={price}
              onChange={value => { setPrice(value) }}
              totalHeight={45}
              minValue={0}
            />
          </Item>
          <Button onPress={handleSubmit} style={{ display: "flex", justifyContent: "center", marginTop: 25 }}><Text>Criar/Editar Produto</Text></Button>
        </List>
      </Form>
    </Container>
  )
}

export default ProductForm