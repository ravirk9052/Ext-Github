import React, {Component, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Icons from 'react-native-vector-icons/Fontisto';

interface DateInputProps {
  isDatePickerVisible: boolean
  date: string
  onChangeDate: (date: string) => void;
}
class DateInput  extends Component<DateInputProps> {

  state = {
    isDatePickerVisible: false,
    date: '',
  }

  onPressDateIcon = () => {
    // console.log('10')
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = (date: any) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const dateValue = `${day}-${month}-${year}`;
    this.setState({date: dateValue})
    // console.log('29',day,month,year);
    this.props.onChangeDate(dateValue);
    this.hideDatePicker();
  };

  render(){
    const {isDatePickerVisible,date} = this.state;
    // console.log('33',isDatePickerVisible)

    const today = new Date();
    return (
      <View style={styles.formContainer}>
        <Text style={styles.text}>Date of Birth</Text>
       
       <View style={styles.input}>
       <TextInput
          style={styles.date}
          placeholder="Date of Birth"
          placeholderTextColor={'black'}
          value={date}
          // onPress={this.onPressDateIcon}
        />
           <Icons style={styles.dateIcon} onPress={this.onPressDateIcon} name='date' size={25} />
       </View>
       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={this.handleConfirm}
        onCancel={this.hideDatePicker}
        maximumDate={today}
      />
       
  
      </View>
    );
  }
  
};

export default DateInput;

const styles = StyleSheet.create({
  formContainer: {
    // borderWidth: 0.2,
    // margin: 10,
    // borderWidth: 1,
    padding: 5,
    marginBottom: -15,
  },
  text: {
    // marginLeft: 5,
    color: '#000000',
    fontWeight: 500,
  },
  input: {
    flexDirection: 'row',
    borderWidth: 0.2,
    borderRadius: 15,
    // margin: 5,
    paddingLeft: 10,
    backgroundColor: '#f1f1f1',
    width: responsiveWidth(90),
    height: 55,
    marginTop: 5,
    marginLeft: -5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  date: {
    width: responsiveWidth(80),
  },
  dateIcon: {
    width: responsiveWidth(10),
    marginLeft: -10,
  }
});
