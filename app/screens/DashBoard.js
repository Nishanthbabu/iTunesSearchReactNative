import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet, TouchableHighlight, TouchableOpacity,
  View,
} from 'react-native';
import mapActions from '../redux/actions/mapActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Image, SearchBar, Text} from 'react-native-elements';
import PickerSelect from '../components/PickerSelect';

const pickerItems = [{label: 'Song', value: 'song'}];

const DashBoard = ({navigation, executeGetSearchRequest, searchResponse}) => {
  const [searchTextState, setSearchTextState] = React.useState('');
  const [selectedEntityState, setSelectedEntityState] = React.useState('song');

  const updateSearch = (search) => {
    setSearchTextState(search);
  };

  const updateEntity = (entity) => {
    setSelectedEntityState(entity);
  };

  const onSearchClick = () => {
    if (searchTextState) {
      executeGetSearchRequest(searchTextState, selectedEntityState);
    }
  };

  const onListItemClick = (item) => {
    navigation.navigate('Details', {trackData: item});
  };

  return (
    <>
      <SafeAreaView>
        <SearchBar
          placeholder="Search Here..."
          onChangeText={updateSearch}
          value={searchTextState}
        />
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View style={{flex: 7}}>
            <PickerSelect
              onPickerSelectValueChange={(value) => updateEntity(value)}
              pickerItems={[]}
              value={selectedEntityState}
              placeholder={pickerItems[0]}
            />
          </View>
          <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Button title="Search" type="clear" onPress={onSearchClick} />
          </View>
        </View>
        {searchResponse ? (
          <FlatList
            initialNumToRender={
              searchResponse && searchResponse.resultCount
                ? searchResponse.resultCount
                : 0
            }
            data={
              searchResponse &&
              searchResponse.results &&
              Array.isArray(searchResponse.results)
                ? searchResponse.results
                : []
            }
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                }}
                onPress={() => onListItemClick(item)}>
                <Image
                  style={styles.imageThumbnail}
                  source={{uri: item.artworkUrl100}}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </TouchableOpacity>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text> No result found</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

const mapStateToProps = ({mapReducer}) => {
  return {...mapReducer};
};
const mapDispatchToProps = (dispatch) => {
  const allActions = {...mapActions};
  return {...bindActionCreators(allActions, dispatch)};
};
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
export default ConnectedComponent;
