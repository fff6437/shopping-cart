import React, { useState } from "react";
import { Button } from 'antd';
import { formatPrice } from '../../utils';

import { connect } from 'dva';

const ProductCart = ({ dispatch, cart, info }) => {
    const [isMove, setMove] = useState(false);
    const handleMouseOver = () => {
        setMove(true);
    }
    const handleMouseOut = () => {
        setMove(false);
    }
    const handleAction = (type) => {
        const params = {
            info,
            action: type
        }
        dispatch({ type: 'cart/setShopCarts', payload: params })
    }
    return (
        <div className={`cart-list ${isMove ? 'cart-list-del-move' : ''}`} key={info.id}>
            <div className='cart-list-del'
                onMouseOver={() => handleMouseOver()}
                onMouseOut={() => handleMouseOut()}
                onClick={() => handleAction('Remove')}
            >X</div>
            <img src={require(`../../static/products/${info.sku}_2.jpg`).default} alt={info.title} />
            <div className='cart-list-detail'>
                <div className='cart-list-detail-title'>
                    {info.title}
                </div>
                <div>
                    {info.availableSizes.map((v, i) => {
                        if (i === info.availableSizes.length - 1) {
                            return <span key={v}>{v}</span>
                        } else {
                            return (<span key={v}>{v},</span>)
                        }
                    })} | {info.style}
                </div>
                <div>
                    Quantity: {info.quantity}
                </div>
            </div>
            <div className='cart-list-action'>
                <div className='cart-list-action-price'>{`${info.currencyFormat}  ${formatPrice(info.price)}`}</div>
                <div>
                    <Button disabled={info.quantity === 1 ? true : false} onClick={() => handleAction('Reduce')}>-</Button>
                    <Button onClick={() => handleAction('Add')}>+</Button>
                </div>
            </div>
        </div>
    )
}
export default connect(({ cart }) => ({
    cart,
}))(ProductCart);