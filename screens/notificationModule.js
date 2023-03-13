// import { StyleSheet, Text, View, FlatList, Image} from 'react-native'
// import React, { useState } from 'react'


// export default function notificationModule() {
//   // const [data, setData] = useState([]);

//   // const databaseData = fetch()
//   // try{
//   //   setData(databaseData) 

//   // }catch{}

//   return (
//     <View>
//       <FlatList
//       data ={data} >
//       keyExtractor = { Item, index, } => { return indexDB.toString()}}
//       renderItem{({item})=>{

//         return {

//         }  }

//       </FlatList>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})


import { StyleSheet, Text, View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import React from 'react';


// const [refreshing, setRefreshing] = React.useState(false);
// const onRefresh = React.useCallback(() => {
//   setRefreshing(true);
//   setTimeout(() => {
//     setRefreshing(false);
//   }, 2000);
// }, []);

export default function NotificationModule() {
  return (

    <View style={{alignItems:'center',right:30}}>
   
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightcyan"
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
})