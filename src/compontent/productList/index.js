import React from "react";
import { connect } from 'dva';
import { Select } from 'antd';
import Product from './product';
import './index.less';

const { Option } = Select;

const sortBy = [
    { value: '', label: 'Select' },
    { value: 'lowestprice', label: 'Lowest to highest' },
    { value: 'highestprice', label: 'Highest to lowest' }
];

const ProductList = ({ dispatch, product, loading }) => {
    const handleChange = (value) => {
        dispatch({ type: 'product/setSortBy', payload: value })
    };
    return (
        <div className='product-list'>
            <div className="sort">
                <div>
                    {product.productList.length} Product(s) found.
                </div>
                <div className='sort-select'>
                    Order by
                    <Select onChange={(v) => handleChange(v)} defaultValue=''>
                        {sortBy.map((v, i) => {
                            return <Option value={v.value} key={v.value}>
                                {v.label}
                            </Option>
                        })}
                    </Select>
                </div>
            </div>
            <Product />
        </div>
    )
}

export default connect(({ product, loading }) => ({
    product, loading
}))(ProductList);
