import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';

const SearchIcon = () => {
  const svgXmlData = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  `;

  return (
    <TouchableOpacity style={tw`bg-white p-2 rounded-full`}>
      <SvgXml xml={svgXmlData} width="24" height="24" fill="black" />
    </TouchableOpacity>
  );
};

export default SearchIcon;
