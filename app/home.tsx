import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView, TextInput, TouchableOpacity, Modal, Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import Animated, { FadeInUp, FadeInDown, FadeInRight } from 'react-native-reanimated';
import tw from 'twrnc';
import PersonIcon from '@/assets/PersonIcon';
import BellIcon from '@/assets/BellIcon';
import SearchIcon from '@/assets/SearchIcon';
import categories from '../assets/data/categories.json'; 

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: any; // For optional properties
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Seafood'); // Default category
  const [searchQuery, setSearchQuery] = useState(''); // Track the search query
  const [searchResults, setSearchResults] = useState<Recipe[]>([]); // Track search results
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // Track selected recipe for details
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility

  // Fetch recipes by category whenever selectedCategory changes
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals); // Update state with fetched recipes
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  }, [selectedCategory]);

  // Function to handle search by name
  const handleSearch = () => {
    if (searchQuery) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.meals) {
            setSearchResults(data.meals); // Set search results
          } else {
            setSearchResults([]); // Handle no results
          }
        })
        .catch((error) => console.error('Error fetching search results:', error));
    }
    Keyboard.dismiss(); // Dismiss the keyboard after search
  };

  // Capture Enter key press to trigger the search
  const handleSearchOnEnter = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === 'Enter') {
      handleSearch(); // Trigger search on Enter
    }
  };

  // Fetch recipe details by ID
  const handleRecipeClick = (recipeId: string) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setSelectedRecipe(data.meals[0]); // Set selected recipe details
          setModalVisible(true); // Show the modal
        }
      })
      .catch((error) => console.error('Error fetching recipe details:', error));
  };

  // Render recipe details modal
  const renderRecipeModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={tw`flex-1`}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`p-4`}>
          <Text style={tw`text-blue-500 text-lg font-bold`}>Back</Text>
        </TouchableOpacity>
  
        <ScrollView style={tw`flex-1 p-5`}>
          {selectedRecipe ? (
            <>
              <Text style={tw`text-2xl font-bold`}>{selectedRecipe.strMeal}</Text>
              <Image source={{ uri: selectedRecipe.strMealThumb }} style={tw`h-60 w-full`} />
              <Text style={tw`text-xl font-semibold mt-3`}>Category: {selectedRecipe.strCategory}</Text>
              <Text style={tw`text-xl font-semibold`}>Area: {selectedRecipe.strArea}</Text>
              <Text style={tw`text-lg mt-4`}>{selectedRecipe.strInstructions}</Text>
  
              {/* Optional: Render ingredients and measures */}
              <Text style={tw`text-lg font-bold mt-4`}>Ingredients:</Text>
              {Object.keys(selectedRecipe).map((key, index) => {
                if (key.startsWith("strIngredient") && selectedRecipe[key]) {
                  const measureKey = `strMeasure${key.match(/\d+/)?.[0]}`; // Use optional chaining to avoid undefined issues
                  const measure = selectedRecipe[measureKey as keyof Recipe];
                  return (
                    <Text key={index} style={tw`text-base`}>
                      {selectedRecipe[key]} - {measure || 'No measure available'}
                    </Text>
                  );
                }
                return null;
              })}
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      </View>
    </Modal>  
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View style={tw`flex-1`} entering={FadeInUp}>

        {/* Header */}
        <Animated.View style={tw`p-5 flex-row items-center justify-between`} entering={FadeInRight}>
          <PersonIcon />
          <BellIcon />
        </Animated.View>

        {/* Welcome Text */}
        <Animated.View style={tw`p-5 pt-0`} entering={FadeInDown.delay(200)}>
          <Text style={tw`font-semibold text-lg`}>
            Welcome to FlavourFlow, Your Culinary Companion
          </Text>
          <Text style={tw`font-bold text-2xl`}>
            Discover delicious recipes from around the 
            <Text style={tw`text-blue-500`}> world</Text>
          </Text>
        </Animated.View>

        {/* Search Input */}
        <Animated.View style={tw`bg-gray-300 p-1 px-2 rounded-full mx-6 flex-row justify-start items-center gap-2`} entering={FadeInRight.delay(300)}>
          <TextInput 
            placeholder='Search for recipe'
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)} // Update search query
            onKeyPress={handleSearchOnEnter} // Capture Enter key press
            style={tw`flex-1 text-lg font-semibold text-black-500 p-3 rounded-l-full`} 
          />
          <TouchableOpacity onPress={handleSearch}> 
            <SearchIcon /> 
          </TouchableOpacity>
        </Animated.View>

        {/* Categories */}
        <View>
          <FlatList 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={tw`gap-5 p-5`} 
            data={categories} // Fetch this from API or use local JSON file
            keyExtractor={(item) => item.idCategory} 
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity onPress={() => setSelectedCategory(item.strCategory)}> 
                  <View>
                    <Image source={{ uri: item.strCategoryThumb }} style={tw`h-12 w-15 rounded-full`} />
                    <Text style={tw`font-semibold text-gray-500 mt-1 text-center`}>{item.strCategory}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )}
          />
        </View>

        {/* Recipes */}
        <View>
          <Text style={tw`px-5 text-3xl font-semibold`}>
            {searchResults.length > 0 ? 'Search Results' : `Recipes for ${selectedCategory}`}
          </Text>
          
          <FlatList 
            data={searchResults.length > 0 ? searchResults : recipes}  // Display search results or category recipes
            keyExtractor={(item) => item.idMeal}  // Each recipe has a unique idMeal
            numColumns={2}
            renderItem={({ item, index }) => (
              <Animated.View style={tw`flex-1 p-5`} entering={FadeInUp.delay(index * 150)}>
                <TouchableOpacity onPress={() => handleRecipeClick(item.idMeal)}>
                  <View>
                    <Image source={{ uri: item.strMealThumb }} style={tw`h-20 w-30 rounded-full`} />
                    <Text style={tw`text-center font-semibold text-gray-500 mt-1`}>{item.strMeal}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )}
          />
        </View>

        {/* Recipe Details Modal */}
        {renderRecipeModal()}

      </Animated.View>
    </ScrollView>
  );
};

export default Home;
