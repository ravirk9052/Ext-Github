import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  {label: 'M.Tech', value: '1'},
  {label: 'MBA', value: '2'},
  {label: 'B.Tech', value: '3'},
  {label: 'B.com', value: '4'},
  {label: 'B.Sc', value: '5'},
  {label: 'Ph.D', value: '6'},
];

class DropdownInput extends Component {
  state = {
    value: null,
    isFocus: false,
  };

//   renderLabel = () => {
//     if (this.state.value || this.state.isFocus) {
//       return (
//         <Text style={[styles.label, this.state.isFocus && {color: 'blue'}]}>
//           Dropdown label
//         </Text>
//       );
//     }
//     return null;
//   };

  onChangeDropdown = (text: any) => {
    // console.log('text',text)
    this.setState({value: text.label})
    let value = text.label
    this.props.onChangeDropDown(value)
  }

  render() {
    const {value, isFocus} = this.state;
    // console.log('41',value,isFocus)
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Highest Education</Text>
        {/* {this.renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="label"
          placeholder={!isFocus ? 'Select Highest Degree' : '...'}
          searchPlaceholder="Search..."
          value={value}
        //   onFocus={(props: {}) => this.setState({...props, isFocus: true})}
        //   onBlur={(props: {}) => this.setState({...props, isFocus: false})}
          onChange={this.onChangeDropdown} />
      </View>
    );
  }
}

export default DropdownInput;

const styles = StyleSheet.create({
  text: {
    // marginLeft: 5,
    color: '#000000',
    fontWeight: 500,
    marginBottom: 7,
  },
  container: {
    // backgroundColor: 'white',
    // padding: 16,
    // marginBottom: -15,
    marginTop: 10,
  },
  dropdown: {
    height: 55,
    width: responsiveWidth(90),
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#f1f1f1',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 30,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
