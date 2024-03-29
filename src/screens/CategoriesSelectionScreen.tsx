import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";

// External libraries imports
import auth from "@react-native-firebase/auth";
import Animated from "react-native-reanimated";
import Spinner from "react-native-loading-spinner-overlay";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParams } from "../navigation/MainStackNavigator";
// Custom Component imports
import { CategorieCard } from "../components/Categories/CategorieCard";
import { SubmitButton } from "../components/SubmitButton";
import { NunitoText } from "../components/Fonts/NunitoText";
import { CategorieCardIcon } from "../components/Categories/CategorieCardIcon";
import { MainContainer } from "../components/MainContainer";
// Custom Hooks imports
import { useHandleCategories } from "../hooks/useHandleCategories";
// types and resources
import { COLORS, FONT_SIZE } from "../../assets/theme";

const screenHeight = Dimensions.get("screen").height;

export type CategoriesNavigationProps = NativeStackScreenProps<
  MainStackParams,
  "CategoriesSelectionScreen"
>;

export const CategoriesSelectionScreen: React.FC<CategoriesNavigationProps> = ({
  navigation,
}) => {
  const {
    handleSelect,
    selectedCategories,
    categories,
    loading,
    handleExpandedCards,
    expandedCards,
    handleSubmitResult,
  } = useHandleCategories(navigation);

  const onHandleSubmitResult = () => {
    const currentUser = auth().currentUser?.uid;

    if (!currentUser) {
      return;
    } else {
      handleSubmitResult(currentUser);
    }
  };

  // loading return
  if (loading) {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MainContainer>
        <NunitoText type="bold" customStyles={styles.title}>
          Pick Your Categories
        </NunitoText>
        <NunitoText>Choose 3 Categories for a Tailored Experience</NunitoText>
        <View style={styles.categoriesContainer}>
          {categories.length > 0 && (
            <Animated.FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContentContainer}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <CategorieCard
                      onExpandPress={() => {
                        handleExpandedCards(item);
                      }}
                      description={item.description}
                      title={item.title}
                      isSelected={selectedCategories.includes(item.id)}
                      expanded={!!expandedCards?.includes(item.id)}
                      onIconPress={() => handleSelect(item.id)}
                    >
                      <CategorieCardIcon title={item.title} />
                    </CategorieCard>
                  </>
                );
              }}
              style={styles.flatList}
            />
          )}
        </View>
        <SubmitButton
          style={styles.ctaButton}
          disabled={selectedCategories.length !== 3}
          onPress={onHandleSubmitResult}
        >
          <NunitoText type="bold" customStyles={styles.ctaButtonText}>
            Confirm
          </NunitoText>
        </SubmitButton>
      </MainContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.indigoDye,
  },
  title: {
    fontSize: FONT_SIZE.title,
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grayText,
    textAlign: "center",
  },
  categoriesContainer: {
    height: screenHeight * 0.7,
  },
  flatList: {
    marginBottom: 10,
  },
  flatListContentContainer: {
    paddingTop: StatusBar.currentHeight || 42,
    borderRadius: 30,
    rowGap: 15,
  },
  ctaButton: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    height: 100,
  },
  ctaButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
});
