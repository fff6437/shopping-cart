import React from "react";
import { connect } from 'dva';
import { Card, Button } from 'antd';
import { formatPrice } from '../../utils';

const ProductList = ({ v, dispatch, product, loading }) => {
    // const productLoading = loading.effects['product/getProduct'];
    // useEffect(() => {
    //     dispatch({ type: 'product/getProduct' })
    // }, [dispatch]);
    const getInstallment = (value) => {
        let productInstallment;
        if (!!value.installments) {
            const installmentPrice = value.price / value.installments;

            productInstallment = (
                <div className="commodity-installment">
                    <span>or {value.installments} x</span>
                    <b>
                        {value.currencyFormat}
                        {formatPrice(installmentPrice, value.currencyId)}
                    </b>
                </div>
            );
        }
        return productInstallment;
    }
    const addCart = (v) => {
        const params = {
            action: 'Add',
            info: v
        }
        dispatch({ type: 'cart/setShopCarts', payload: params })
    }
    return (
        // <Spin tip="Loading..." spinning={productLoading}>
        //     <div className='product'>
        // product.productList.map((v, i) => {
        //     return (
        <Card
            key={v.id}
            hoverable
            cover={<img src={require(`../../static/products/${v.sku}_1.jpg`).default} alt={v.title} />}
            extra={v.isFreeShipping ? <div className="product-shipping">Free shipping</div> : null}
        >
            <div className='commodity'>
                <span className='commodity-title'>{v.title}</span>
                <i></i>
                <div>
                    Sizes:
                    {v.availableSizes.map(v => {
                        return <span key={v} className='commodity-size'>{v}</span>
                    })}
                </div>

                <div className='commodity-price'>
                    <div className='commodity-val'>
                        <span className='small'>{v.currencyFormat}</span>
                        <b>{formatPrice(v.price, v.currencyId).substr(0, formatPrice(v.price, v.currencyId).length - 3)}</b>
                        <span>{formatPrice(v.price, v.currencyId).substr(formatPrice(v.price, v.currencyId).length - 3, 3)}</span>
                    </div>
                    {getInstallment(v)}
                </div>
                <Button className='commodity-btn' type="primary" onClick={() => addCart(v)}>Add to cart</Button>
            </div>
        </Card>
        //     )
        // })
        //     </div>
        // </Spin>
    )
}

export default connect(({ product, loading, cart }) => ({
    product, loading, cart
}))(ProductList);