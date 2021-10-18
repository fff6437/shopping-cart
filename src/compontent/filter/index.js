import React from "react";
import { Checkbox } from 'antd';
import { connect } from 'dva';
import './index.less';

const filter = ({ dispatch, product }) => {
    const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
    const option = availableSizes.map(v => {
        return {
            label: v,
            value: v
        }
    })
    const setFilters = (v) => {
        dispatch({ type: 'product/setFilters', payload: v })
    }
    return (
        <div className='filter'>
            <div className='filter-title'>Sizes:</div>
            <Checkbox.Group options={option} onChange={(v) => setFilters(v)} />
        </div>
    )
}
export default connect(({ product }) => ({
    product,
}))(filter);