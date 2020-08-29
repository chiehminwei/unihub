import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { screenStyles } from '~/stylesheets/screenStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MapOrListButton = (props) => {
  if (props.status == 'map') {
    return (
      <TouchableOpacity
        style={{marginRight: 12, width:25}} 
        onPress={() => alert('map')}>
        <MaterialCommunityIcons name='map-marker' size={25} />
      </TouchableOpacity>
    );
  }
  else {
    return (
      <TouchableOpacity
        style={{marginRight: 12, width:25}} 
        onPress={() => alert('map')}>
        <MaterialCommunityIcons name='format-list-bulleted' size={25} />
      </TouchableOpacity>
    );
  }    
}

export const HomeScreenHeader = ({ navigation }) => {
  return (
    <View style={{alignSelf: 'stretch', flex: 1 }}>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  }}>
        <View>
          <Text style={screenStyles.headerTitle}>
            Browse
          </Text>
        </View>
        <View>
          <TouchableOpacity 
              style={{right:10, width:30}}
              onPress={() => alert('CreateEventScreen')}>
              <MaterialCommunityIcons name='plus-box' size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3  }}>
        <View>
          <TouchableOpacity
            style={{marginLeft: 12, width:25}} 
            onPress={() => alert('CalendarScreen')}>
              <MaterialCommunityIcons name='calendar' size={25} />
          </TouchableOpacity>
        </View>
        <View>
          <MapOrListButton status={'map'}/>
        </View>
        <View>
          <TouchableOpacity
            style={{marginRight: 12, width:25}} 
            onPress={() => alert('Filter')}>
            <MaterialCommunityIcons name='filter' size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}