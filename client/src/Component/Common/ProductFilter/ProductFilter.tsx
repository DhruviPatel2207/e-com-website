import { Rate, Select, Slider, Typography } from 'antd';
import Search from 'antd/es/input/Search';

import React from 'react';
import { IProduct } from '../../../types/types';
import { useAppSelector } from '../../../utility/Hooks/Redux/hooks';
import useActions from '../../../utility/Hooks/Redux/useActions';
import { capitalize } from '../../../utility/capitalize';
import './ProductFilter.scss';

const { Title } = Typography;

const ProductFeatures = ({ productData }: { productData: IProduct[] }) => {
  const { filters } = useAppSelector((state) => state.product);

  const MinMaxPrice = productData.map(({ discountedPrice }) => discountedPrice);

  const minPrice = Math.min(...MinMaxPrice);
  const maxPrice = Math.max(...MinMaxPrice);
  const discountprice = productData.map((data) => data.discountPercentage);
  const minDisPrice = Math.min(...discountprice);
  const maxDisPrice = Math.max(...discountprice);
  const categorie = productData.map((data) => ({
    label: capitalize(data.category),
    value: data.category,
  }));
  const { setFilterData } = useActions();
  const category = categorie.filter((obj, index) => {
    return index === categorie.findIndex((o) => obj.value === o.value);
  });

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchObj = { ...filters, search: e.target.value };
    setFilterData(newSearchObj);
  };

  const priceRangbar = (value: number[]) => {
    const newPriceRangeObj = structuredClone(filters);
    newPriceRangeObj.priceRang.min = value[0];
    newPriceRangeObj.priceRang.max = value[1];
    setFilterData(newPriceRangeObj);
  };

  const onDiscount = (value: number[]) => {
    const newDisRangeObj = structuredClone(filters);
    newDisRangeObj.discountRang.min = value[0];
    newDisRangeObj.discountRang.max = value[1];
    setFilterData(newDisRangeObj);
  };
  const Rating = (value: number) => {
    const newRatingObj = { ...filters };
    newRatingObj.rating = value;
    setFilterData(newRatingObj);
  };
  const selectCetegories = (options: string) => {
    const newCategoriesObj = { ...filters };
    newCategoriesObj.categories = options;
    setFilterData(newCategoriesObj);
  };
  return (
    <div className='filter-wrapper'>
      <div>
        <Title level={5}>Search Products</Title>
        <Search
          placeholder='Search products'
          onChange={onSearch}
        />
      </div>

      <Title level={4}>Other Filters</Title>
      <div className='filters-flex'>
        <div>
          <Title level={5}>Price Range</Title>
          <Slider
            range
            defaultValue={[minPrice, maxPrice]}
            max={maxPrice}
            min={minPrice}
            onAfterChange={priceRangbar}
          />
        </div>
        <div>
          <Title level={5}>Discount</Title>
          <Slider
            range
            defaultValue={[minDisPrice, maxDisPrice]}
            min={minDisPrice}
            max={maxDisPrice}
            onAfterChange={onDiscount}
          />
        </div>
      </div>
      <div className='filters-flex'>
        <div>
          <Title level={5}>Rating</Title>
          <Rate
            allowHalf
            defaultValue={2.5}
            onChange={Rating}
          />
        </div>
        <div>
          <Title level={5}>Select Categories</Title>
          <Select
            style={{
              width: '100%',
            }}
            showSearch
            placeholder='Select categories'
            options={category}
            onChange={selectCetegories}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
