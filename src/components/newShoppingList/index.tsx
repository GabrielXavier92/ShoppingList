import React, { useState} from 'react';
import { Container, Form, Item, Input, Button, Text, List, Spinner, Label, Toast } from 'native-base';
import { useMutation } from "@apollo/react-hooks";
import { useNavigation } from '@react-navigation/native';

import gql from "graphql-tag";

const INSERT_SHOPPING_LIST = gql`
mutation ($name: String!) {
  insert_shopping_list(objects: {name: $name}) {
    affected_rows
  }
}
`


const NewShoppingList = () => {

  const [name, setName] = useState('')
  
  const navigation = useNavigation()

  const [insertShoppingList, { loading, error }] = useMutation(INSERT_SHOPPING_LIST, {
    onCompleted: () => changePage(),
    onError: () => handleError()
  }) 

  const changePage = () => {
    Toast.show({
      text: "Lista criada com sucesso",
      position: "bottom",
      type: "success",
      duration: 2000
    })
    navigation.navigate('shoppingList')
  }

  const handleError = () => {
    Toast.show({
      text: "Erro ao criar a lista",
      position: "bottom",
      type: "danger",
      duration: 2000
    })
  }

  const handleSubmit = () => {
    insertShoppingList({variables: { name }})
  }

  if (loading) return <Spinner />
  
  return (
    <Container style={{ paddingHorizontal: 20, paddingTop: 20 }}>
      <Form>
        <List>
          <Item floatingLabel>
            <Label>Nome</Label>
            <Input placeholder="Nome da Lista" value={name} onChangeText={value => { setName(value)} }/>
          </Item>
          <Button onPress={handleSubmit} style={{ display: "flex", justifyContent: "center", marginTop: 25 }}><Text>Criar Lista</Text></Button>
        </List>
        </Form>
    </Container>
  )
}

export default NewShoppingList