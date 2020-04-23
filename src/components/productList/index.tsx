import React from 'react';
import { List, Text, View, Container, Fab, ListItem, Body, Right, Left, Button, Content, Toast } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { useMutation } from "@apollo/react-hooks";
import { useNavigation } from '@react-navigation/native';

import gql from "graphql-tag";

interface IProduct { 
  id: string,
  name: string,
  price: number,
  ammount: number,
  shopping_list_id: string,
}

interface IProductList {
  products: [IProduct],
  shopping_list_id: string,
}


const DELETE_PRODUCT = gql`
mutation ($id: uuid!) {
  delete_product(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
`

const ProductList: React.FC<IProductList> = ({ products, shopping_list_id }) => {
  const navigation = useNavigation()
  
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => handleSuccess(),
    onError: () => handleError()
  })

  const handleSuccess = () => {
    Toast.show({
      text: "Produto deletado com sucesso",
      position: "bottom",
      type: "success",
      duration: 2000
    })
  }

  const handleError = () => {
    Toast.show({
      text: "Erro ao deletar produto",
      position: "bottom",
      type: "danger",
      duration: 2000
    })
  }

  const handleDeleteProduct = (productId: string) => {
    deleteProduct({variables: { id: productId }})
  }

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <List >
          <ListItem itemDivider first>
            <Text>Produtos</Text>
          </ListItem>
          {products.map((item: IProduct) => (
            <ListItem key={item.id} noIndent={true} onPress={() => navigation.navigate('productForm', { item })}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Body style={{display: 'flex', flexDirection: 'row'}}>
                <Text>Qt. {item.ammount}</Text>
                <Text>R$ {item.price}</Text>
              </Body>
              <Right>
                <Button onPress={() => { handleDeleteProduct(item.id) }} small danger style={{ width: 40, justifyContent: 'center' }}>
                  <Ionicons name='md-trash' size={20} color={'white'} />
                </Button>
              </Right>
            </ListItem>
          ))}
        </List>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: 'green' }}
          position="bottomRight"
          onPress={() => navigation.navigate('productForm', { shopping_list_id: shopping_list_id })}>
          <Ionicons name="md-add" size={35} />
        </Fab>
      </View>
    </Container>
  )
}

export default ProductList