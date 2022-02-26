import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import { IcHomeActive, IcHomeNormal, IcMessageActive, IcMessageNormal, IcProfileActive, IcProfileNormal } from '../../assets/icon';

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Home':
      return focus ? <IcHomeActive /> : <IcHomeNormal /> ;
    case 'Message':
      return focus ? <IcMessageActive /> : <IcMessageNormal />;
    case 'Profile':
      return focus ? <IcProfileActive /> : <IcProfileNormal />;
    default:
      return <IcHomeActive />;
  }
};

const BottomNavigator = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 18,
  },
});