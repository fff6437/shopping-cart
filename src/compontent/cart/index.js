import React from 'react';
import { connect } from 'dva';
import { Drawer, Badge, Button, Modal } from 'antd';
import { formatPrice } from '../../utils';
import List from './list';

import './index.less'


const Carts = ({ dispatch, cart, loading }) => {
    const isOpenDraw = cart.isOpenDraw;
    const initialCarts = cart.initialCarts;
    const onClose = () => {
        dispatch({ type: 'cart/setOpenDraw', payload: false })
    }
    const params = {
        productQuantity: 0,
        installments: 0,
        totalPrice: 0,
        currencyId: 'USD',
        currencyFormat: '$'
    }
    const totalInfo = initialCarts.reduce((params, v) => {
        params.productQuantity += v.quantity;
        params.installments = Math.max(params.installments, v.installments);
        params.totalPrice += v.price * v.quantity;
        return params;
    }, params)
    const proceedToCheckout = () => {
        const {
            totalPrice,
            productQuantity,
            currencyFormat,
            currencyId
        } = totalInfo;

        if (!productQuantity) {
            Modal.info({
                title: '购买成功!',
                content: (
                    <div>
                        Add some product in the cart!
                    </div>
                ),
                onOk () { },
            });
        } else {

            Modal.info({
                title: '即将购买：',
                content: (
                    <div>
                        {`总价: ${currencyFormat} ${formatPrice(
                            totalPrice,
                            currencyId
                        )}`}
                    </div>
                ),
                onOk () { dispatch({ type: 'cart/setShopCarts', payload: { info: {}, action: 'clear' } }); Modal.info({ title: '购买成功!' }) },
            });
        }
    };

    const drawFooter = () => {
        return (
            <div>
                <div className='cart-total-info'>
                    <div className="sub">SUBTOTAL</div>
                    <div className="sub-price">
                        <div className="sub-price__val">
                            {`${totalInfo.currencyFormat} ${formatPrice(
                                totalInfo.totalPrice,
                                totalInfo.currencyId
                            )}`}
                        </div>
                        <span className="sub-price__installment small">
                            {!!totalInfo.installments && (
                                <span>
                                    {`OR UP TO ${totalInfo.installments} x ${totalInfo.currencyFormat
                                        } ${formatPrice(
                                            totalInfo.totalPrice / totalInfo.installments,
                                            totalInfo.currencyId
                                        )}`}
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                <Button type='primary' disabled={initialCarts.length === 0} onClick={() => proceedToCheckout()}>Checkout</Button>
            </div>
        );
    }

    return (
        <div className="carts carts-header">
            <Badge count={totalInfo.productQuantity} onClick={() => { dispatch({ type: 'cart/setOpenDraw', payload: true }) }}>
                <div className='cart-btn'></div>
            </Badge>

            <Drawer placement="right" onClose={onClose} visible={isOpenDraw} mask={false} className='carts-draw' footer={drawFooter()}>
                <div className="carts-header">
                    <Badge count={totalInfo.productQuantity}>
                        <div className='cart-btn'></div>
                    </Badge>
                    <span className="carts-header-title">Cart</span>
                </div>
                {initialCarts.length > 0 ? initialCarts.map(v => {
                    return (
                        <List info={v} key={v.id} />
                    )
                }) :
                    <div className='empty-title'>Add some products in the cart <br />:)</div>}
            </Drawer>
        </div>

    )

};

export default connect(({ cart }) => ({
    cart
}))(Carts);