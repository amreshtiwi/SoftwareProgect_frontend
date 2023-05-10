import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import Colors from "../color";
import { SelectList } from "react-native-dropdown-select-list";
import Colors from "../color";
import { maritalApi } from "../api/maritalApi";

function DropDownList({ setSelected }) {

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
    
      getMaritalStatusValues();
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
          placeholder="الحالة الإجتماعية"
          dropdownStyles={{ borderColor: Colors.darkGreen }}
        />
      </View>
  );
}
export default DropDownList;
