import {StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';

const PickerSelect = (props) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => props.onPickerSelectValueChange(value)}
      items={props.pickerItems}
      style={{
        inputIOS: styles.input,
        inputAndroid: styles.input,
      }}
      value={props.value}
      placeholder={props.placeholder}
      Icon={() => {
        return (
          <Icon
            name="caretdown"
            size={30}
            color="#000"
            style={{paddingTop: 10, paddingRight: 10}}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default PickerSelect;
