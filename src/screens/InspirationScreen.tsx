import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getQuotesFromFirestore } from "../services/quoteService";
import { Quote } from "../types";
import Spinner from "react-native-loading-spinner-overlay";
import { QuoteCard } from "../components/QuoteCard";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../assets/theme";

export const InspirationScreen = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  // used to control index
  const quoteListRef = useRef<FlatList>(null);

  useEffect(() => {
    setLoading(true);
    getQuotesFromFirestore()
      .then((res) => {
        const quotesList = res.docs.map((doc) => doc.data() as Quote);
        setQuotes(quotesList);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // function to handle quote navigation: left or right
  // const handleNav = (direction: string) => {
  //   if (direction === 'left' && index > 0) return
  //     setIndex(prevIndex => prevIndex - 1);
  //    if (direction === 'right' && index < quotes.length - 1) return
  //     setIndex(prevIndex => prevIndex + 1);
  // }

  // useEffect(() => {
  //   quoteListRef.current?.scrollToIndex({
  //     index,
  //     animated: true,
  //     viewPosition: 0.5
  //   })
  // }, [index])

  useEffect(() => {
    console.log(index);
  }, [index]);

  // loading return
  if (loading) {
    return <Spinner />;
  }

  // TODO: lazy lodad quotes => check FlashList package
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} />

      <FlatList
        ref={quoteListRef}
        initialScrollIndex={index}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={quotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index: quoteIndex }) => (
          <View>
            <View style={styles.quoteListContainer}>
              <QuoteCard
                customStyles={
                  index === quoteIndex
                    ? {
                        backgroundColor: COLORS.whiteText,
                        borderColor: COLORS.orangeWeb,
                        borderWidth: 2,
                      }
                    : {}
                }
                text={item.text}
                author={item.author}
              />
            </View>
            <View style={styles.quoteNavContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  if (index === 0) {
                    return;
                  }
                  setIndex(index - 1);
                }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  if (index === 0) {
                    return;
                  }
                  setIndex(index + 1);
                }}
              >
                <AntDesign name="arrowright" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    height: 300,
    alignSelf: "center",
    aspectRatio: 16 / 9,
  },
  quoteListContainer: {
    height: 150,
  },
  quoteNavContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: COLORS.orangeWeb,
  },
  iconButton: {
    padding: 5,
    backgroundColor: COLORS.whiteText,
    borderRadius: 50,
  },
});
