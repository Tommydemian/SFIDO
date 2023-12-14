import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CategorieCard } from './CategorieCard';
import { CategorieCardIcon } from './CategorieCardIcon';

import { Categorie } from '../types';

type Props = {
    item: Categorie

}

const CategoryListItem: React.FC<Props> = ({item}) => {
  return (
    <>
            <CategorieCard
              onExpandPress={() => {
                handleExpandedCards(item)
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
  )
}

export default CategoryListItem

const styles = StyleSheet.create({})