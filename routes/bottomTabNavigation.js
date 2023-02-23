import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import OrderModule from '../screens/orderModule';
import StationModule from '../screens/stationModule';
import MapModule from '../screens/mapModule';
import NotificationModule from '../screens/notificationModule';
import ProfileModule from '../screens/accountProfileModule';
import notificationModule from '../screens/notificationModule';
import   {FontAwesome5} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View,Image,Button,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView, Platform } from 'react-native';
const Tab= createBottomTabNavigator();
function MyTabsNavigator(){

    const CustomTabBarButon=({children,onPress})=>{
        <TouchableOpacity
        style={{
            top:-30,
            justifyContent:'center',
            alignItems:'center',
            ...style.shadow
        }}
        onPress={onPress}>
            <View style={{
                width:70,
                height:70,
                borderRadius:35,
                backgroundColor:'#e32f45'
            }}>
                {children}
            </View>
        </TouchableOpacity>

    }
return(
  
   
        <Tab.Navigator initialRouteName='Map' independent={true}
        screenOptions={({route})=>({
            tabBarIcon:({focused,size,color})=>{
                let iconName;
                if(route.name === 'Order'){
                  //  iconName ='first-order';
                  iconName ='reorder';
                    // <Image source={require('../assets/purchase-order.png')}/>
                    size = focused? 30:19;
                    color=focused? 'white' : 'black';
                } else if (route.name === 'Station'){
                  iconName ='home'; 
                  size = focused? 30:19;
                  color=focused? 'white' : 'black';
                }
                else if (route.name === 'Map'){
                  //iconName ='map-marked-alt';
                  iconName ='map';
                  size = focused? 30:19;
                  color=focused? 'white' : 'black';
                }
                else if (route.name === 'Notification'){
                   iconName ='bell';
                
                  size = focused? 30:19;
                  color=focused? 'white' : 'black';
                }
                else if (route.name === 'Profile'){
                  iconName ='user-circle';
                  size = focused? 30:19;
                  color=focused? 'white' : 'black';
                  
                  
                }
                return (
                  <FontAwesome
                  name= {iconName}
                  size = {size}
                  color={color}
                 
                    />
                 
                    
                )
            },
            headerShown:false,
            tabBarStyle:{
                bottom:15,
                left:10,
                right:10,
                elevation:0,
                backgroundColor:'#73a9c2',
                borderRadius:15,
                height:65,
                width:'95%',
                ...style.shadow
                },
                tabBarLabelStyle:{
                  color:'white',
                  fontSize:12,
                  paddingBottom:8
                }
                
                // {
                  
                //   fontSize: 12,
                //   paddingBottom:8
                  
                // } 
            
          
            
        })

        }>
        
            <Tab.Screen name='Order'
            component={OrderModule}/>

            <Tab.Screen name='Station'
            component={StationModule}/>

            <Tab.Screen name='Map'
           
            component={MapModule}
            
           
            />

            <Tab.Screen name='Notification'
            component={notificationModule}/>

            <Tab.Screen name='Profile'
            component={ProfileModule}/>
            
        </Tab.Navigator>
   
)
}
const style=StyleSheet.create({
    shadow:{
      shadowColor:'#7F5DF0',
      shadowOffset:{
        width:0,
        height:10,
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5,
    }
  })

export default MyTabsNavigator;