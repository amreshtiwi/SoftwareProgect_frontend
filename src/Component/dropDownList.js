import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import Colors from "../color";
import { SelectList } from "react-native-dropdown-select-list";
import Colors from "../color";
import { maritalApi } from "../api/maritalApi";

function DropDownList({ setSelected ,type,placeholder ="الحالة الإجتماعية"}) {

  //   const [selected, setSelected] = React.useState("");
  const [data , setData] =useState([])

  useEffect(() => {
    const getMaritalStatusValues = async () =>{
        const maritalData = await maritalApi().then((result) => {
            for (const key in result.data) {
                data.push({ key, value: result.data[key] });
              }
        }).catch( err => {
          console.log('Promise rejected with error:', err);
        });
      }
    if(type === 'TYPE1'){
      setData([
        { key: "0", value: "كمبياله" },
        { key: "1", value: "شك" },
      ])
    }else if(type === 'TYPE2') {
      setData([
        { key: "0", value: "مبرئ للذمة" },
        { key: "1", value: "غير مبرئ للذمة" },
      ])
    }else if (type === 'TYPE3'){
      setData([
        { key: "0", value: "اللجنة الطبية العليا" },
        { key: "1", value: "اللجنة الطبية المحلية" },
      ])
    }else{
      getMaritalStatusValues();
    }
      
  },[])


//   const data = [
//     { key: "0", value: "Mobiles" },
//     { key: "1", value: "Appliances" },
//     { key: "2", value: "Cameras" },
//     { key: "3", value: "Computers" },
//   ];

  return (
      <View
        style={{
          width: "100%",
          backgroundColor: Colors.lightVanilla1,
          borderRadius: 5,
          borderWidth: 0,
        }}
      >
        <SelectList
          setSelected={setSelected}
          data={data}
          save="key"
          search={false}
          boxStyles={{ borderRadius: 5, borderWidth: 0 }}
          placeholder={placeholder}
          dropdownStyles={{ borderColor: Colors.darkGreen }}
        />
      </View>
  );
}
export default DropDownList;
