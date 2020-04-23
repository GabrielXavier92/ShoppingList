import React from 'react';
import { List, Text, Spinner, View, Container, Fab, Icon, ListItem, Body, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { useSubscription } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';

import gql from 'graphql-tag';
import moment from 'moment';

interface IShoppingItem {
  onPress?: any,
  id: string,
  name: string
  created_at: string
  status: boolean
  icon: boolean
}
const GET_SHOPPING_LISTS = gql`
subscription {  
	shopping_list {
    id
		name
    created_at
    status
  }
}
`

const ShoppingList = () => {
  const navigation = useNavigation()  

  const { loading, error, data } = useSubscription(GET_SHOPPING_LISTS)

  if (loading) return <Container><Text>Carregando listas...</Text><Spinner /></Container>
  if (error) return <Text>Error</Text>
  
  return (
    <Container>
      <View style={{ flex: 1}}>
        <List >
          {data.shopping_list.map((item: IShoppingItem) => (
            <ListItem key={item.id} noIndent={true} onPress={() => navigation.navigate('editList', { id: item.id })}>
              <Body>
                <Text>{item.name}</Text>
                <Text note>{moment(item.created_at).format('Do MMMM YYYY')}</Text>
              </Body>
              <Right>
                <Ionicons name="md-arrow-round-forward" size={20} />
              </Right>
            </ListItem>
          ))}
        </List>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: 'green' }}
          position="bottomRight"
          onPress={() => navigation.navigate('newShoppingList')}>
          <Ionicons name="md-add" size={35} />
        </Fab>
      </View>
    </Container>
  )
}

export default ShoppingList