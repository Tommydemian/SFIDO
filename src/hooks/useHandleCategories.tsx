import { useState, useEffect } from "react";
import { Categorie } from "../types";
import { getCategoriesFromFirestore } from "../services/categoriesService";
import { addIntererstsToFirestoreUser } from "../services/userService";
import { CategoriesNavigationProps } from "../screens/CategoriesSelectionScreen";

export const useHandleCategories = (navigation: CategoriesNavigationProps['navigation']) => {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(false)  
  const [expandedCards, setExpandedCards] = useState<Categorie['id'][]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  
  // display categories
  useEffect(() => {
    setLoading(true)
    getCategoriesFromFirestore()
    .then((res) => {
      const categoriesList = res.docs.map(doc => doc.data() as Categorie)
      setCategories(categoriesList)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoading(false))
  }, [])

  // expand categories
  const handleExpandedCards = (card: Categorie) => {
    expandedCards?.includes(card.id) 
    ? 
      setExpandedCards(current => current?.filter(item => item !== card.id) || [])
    :
      setExpandedCards(current => [...(current || []), card.id]);
};


  // select categories
    const handleSelect = (interestId: number) => {
      if (expandedCards?.includes(interestId)) {
        if (selectedCategories.includes(interestId)) {
          setSelectedCategories((current) => current.filter(id => id !== interestId));
        } else if (selectedCategories.length < 3) {
            setSelectedCategories([...selectedCategories, interestId]);
        }
      };
    }

    // submit results
    const handleSubmitResult = (uid: string) => {
      if (selectedCategories.length > 0) {
        addIntererstsToFirestoreUser(uid, selectedCategories)
        .then(() => {
          navigation.navigate('BottomTabs')
        }).catch((err) => {
          console.log(err);
        })
      }
    }

    return {handleSelect, selectedCategories, categories, loading, handleExpandedCards, expandedCards, handleSubmitResult}
}