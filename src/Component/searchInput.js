import React from "react";
import { Searchbar } from "react-native-paper";
import Colors from "../color";

function SearchInput({onChangeSearch,searchQuery}) {
  return (
    <Searchbar
      placeholder="بحث"
      onChangeText={onChangeSearch}
      value={searchQuery}
      elevation={2}
      style={{ backgroundColor: Colors.lightVanilla1, margin: 10 }}
    />
  );
}

export default SearchInput;
