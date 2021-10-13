import React from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

const sortBy = [
  { value: '', label: 'Select' },
  { value: 'lowestprice', label: 'Lowest to highest' },
  { value: 'highestprice', label: 'Highest to lowest' }
];

const Sort = ({dispatch, model, loading}) => {
    console.log(loading);
    // console.log(loading.effects['model/getProduct']);
    const handleChange = (value) => {
        dispatch({ type: 'model/setSortBy', payload: value })
    };


   return (
        <div className="sort">
            Order by
            <Select onChange={(v) => handleChange(v)} defaultValue=''>
                {sortBy.map((v,i) => {
                    return <Option value={v.value} key={v.value}>
                        {v.label}
                    </Option>
                })}
            </Select>
        </div>
   ) 
  
};

export default connect(({ model }) => ({
    model,
  }))(Sort); 