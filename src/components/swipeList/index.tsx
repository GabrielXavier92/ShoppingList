import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity
} from 'react-native';


import { SwipeListView } from 'react-native-swipe-list-view';

// import RowItem from './rowItem';
// import HiddenItem from './hiddenItem';

export default function SwipeList({data, onEdit, onDelete, onPress}) {

  const RowItem = data => {
    return (
      <TouchableHighlight
        onPress={() => onPress(data.item)}
        style={styles.rowFront}
        underlayColor={'#AAA'}
      >
        <View>
          <Text>{data.item.name}</Text>
        </View>
      </TouchableHighlight>
    )
  };

  const HiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backBtn, styles.backRightBtnLeft]}
        onPress={() => onEdit(data.item)}
      >
        <Text style={styles.backTextWhite}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backBtn, styles.backRightBtnRight]}
        onPress={() => onDelete(data.item)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
 
  return (
    <View style={styles.container}>
      <SwipeListView
        data={data}
        renderItem={RowItem}
        renderHiddenItem={HiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    left: 0,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});