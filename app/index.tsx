import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import tw from 'twrnc'; 
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/home')} style={tw`bg-blue-500 flex-1 justify-center items-center`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Image source={require('../assets/logo.gif')} style={tw`h-70 w-70 mb-4`} />
        <Text style={tw`text-5xl font-bold text-black mb-2`}>FlavourFlow</Text>
        <Text style={tw`text-2xl font-semibold text-center text-black`}>Your Global Flavor Guide</Text>
      </View>
    </Pressable>
  );
}

export default Index;

