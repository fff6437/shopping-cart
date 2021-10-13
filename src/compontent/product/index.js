import React, {useEffect} from "react";
import { connect } from 'dva';
import Sort from '../sort';
import Cart from "../cart";


const Product = ({dispatch, model, loading}) => {
    console.log(model);
    console.log(loading);
    console.log(loading.effects['model/getProduct']);
    const productLoading = loading.effects['model/getProduct'];
    useEffect(() => {
        dispatch({ type: 'model/getProduct' })
    }, [])
    return (
        <>
            <Cart />
            <Sort />
            {!productLoading ?
                model.product.map((v,i) => {
                return (
                    <div key={i} style={{display: "inline-block"}}>
                        <img src={require(`../../static/products/${v.sku}_1.jpg`).default} alt={v.title} />
                    </div>
                )
            }) : <div>loading</div>}
        </>
    )
}

export default connect(({ model,loading }) => ({
    model,loading
  }))(Product); 