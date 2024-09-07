import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc'; 
import { useRouter } from 'expo-router'; // Use the same router as in index.tsx

const CreateProfile = () => {
  const router = useRouter();

  return (
    <View style={tw`flex-1 p-5`}>
      <Text style={tw`text-2xl font-bold`}>Create Profile</Text>
      <TextInput
        placeholder="Name"
        style={tw`border p-2 mt-4`}
      />
      <TextInput
        placeholder="Email"
        style={tw`border p-2 mt-4`}
      />
      {/* Add other input fields as needed */}
      <TouchableOpacity onPress={() => alert('Profile Created')} style={tw`bg-blue-500 p-2 mt-4 rounded`}>
        <Text style={tw`text-white text-center`}>Create Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/home')} style={tw`mt-4`}>
        <Text style={tw`text-blue-500 text-lg`}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProfile;

