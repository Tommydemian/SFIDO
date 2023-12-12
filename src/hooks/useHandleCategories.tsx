import { useState, useEffect } from "react";
import { Categorie } from "../types";
import { getCategoriesFromFirestore } from "../services/categoriesService";

export const useHandleCategories = () => {
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

    return {handleSelect, selectedCategories, categories, loading, handleExpandedCards, expandedCards}
}