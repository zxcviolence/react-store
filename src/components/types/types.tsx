import React from 'react';

export interface IProduct {
  id: string;
  image: string;
  title: string;
  memory: number[];
  colours: string[];
  price: number;
  category: number;
  rating: number;
  descriptionCharacteristics: string[];
}

export interface IProductCart {
  id: string;
  image: string;
  title: string;
  memory: number;
  colour: string;
  price: number;
  count: number;
}

export interface ISort {
  name: string;
  sortProperty: string;
  order: 'asc' | 'desc';
}

export interface ISearchContext {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
