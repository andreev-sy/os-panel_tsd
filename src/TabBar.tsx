// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// function TabBar({ state, descriptors, navigation }) {
//     return (
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 15 }}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//               ? options.title
//               : route.name;
  
//           const isFocused = state.index === index;
  
//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//             });
  
//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name);
//             }
//           };
  
//           const onLongPress = () => {
//             navigation.emit({
//               type: 'tabLongPress',
//               target: route.key,
//             });
//           };
  
//           return (
//             <TouchableOpacity
//               accessibilityRole="button"
//               accessibilityState={isFocused ? { selected: true } : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               style={{ flexBasis: 50 }}
//             >
//               <View style={{ alignItems: "center" }}>
//                 <View style={{position: 'absolute', top: -2, right: -2, paddingHorizontal: 3, paddingVertical: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 50 }}>
//                   <Text style={{ color: 'white', fontSize: 8 }}>12</Text>
//                 </View>
//                 <Icon name="check" size={20} style={{ color: isFocused ? '#673ab7' : '#222' }}/>
//                 <Text style={{ color: isFocused ? '#673ab7' : '#222', fontSize: 10 }}>
//                   {label}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   }

// export default TabBar;
