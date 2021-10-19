import React, { useEffect } from "react";
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import Product from '../../../compontent/product';
import './index.less';

const { Option } = Select;

const sortBy = [
    { value: '', label: 'Select' },
    { value: 'lowestprice', label: 'Lowest to highest' },
    { value: 'highestprice', label: 'Highest to lowest' }
];

const ProductList = ({ dispatch, product, loading }) => {
    const productLoading = loading.effects['product/getProduct'];
    useEffect(() => {
        dispatch({ type: 'product/getProduct' })
    }, [dispatch]);
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
            <Spin tip="Loading..." spinning={productLoading}>
                <div className='product'>
                    {product.productList.map(v =>
                        <Product v={v} />
                    )}
                </div>
            </Spin>
        </div>
    )
}

export default connect(({ product, loading }) => ({
    product, loading
}))(ProductList);
