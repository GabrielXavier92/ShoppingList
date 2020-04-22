import React from 'react';
import { List, Text, View, Container, Fab, ListItem, Body, Right, Left } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

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

const ProductList: React.FC<IProductList> = ({ products, shopping_list_id }) => {
  const navigation = useNavigation()

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
              <Body>
                <Text>Qt. {item.ammount}</Text>
              </Body>
              <Right>
                <Text>R$ {item.price}</Text>
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