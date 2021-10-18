
const initialCarts = JSON.parse(window.localStorage.getItem('carts')) || [];

const cart = {
    namespace: 'cart',
    state: {
        initialCarts,
        isOpenDraw: false,
    },
    effects: {
        *setShopCarts ({ payload }, { select, call, put }) {
            // const carts = cart.state.initialCarts;
            let carts = yield select(state => state.cart.initialCarts);
            if (payload.action === 'clear') {
                carts = [];
            } else {
                const num = carts.findIndex((v) => {
                    return v.id === payload.info.id;
                });
                if (num > -1) {
                    if (payload.action === 'Add') {
                        // 增加数量
                        carts[num].quantity += 1;
                        yield put({ type: 'setOpenDraw', payload: true });
                    } else if (payload.action === 'Remove') {
                        // 移除
                        carts.splice(num, 1);
                    } else if (payload.action === 'Reduce') {
                        // 减少数量
                        carts[num].quantity -= 1;
                    } else {
                    }
                } else {
                    payload.info.quantity = 1;
                    carts.push(payload.info);
                    yield put({ type: 'setOpenDraw', payload: true });
                }
            }
            window.localStorage.setItem('carts', JSON.stringify(carts));
            yield put({ type: 'setCarts', payload: carts });
        },
    },
    reducers: {
        setCarts (state, { payload }) {
            return { ...state, initialCarts: payload };
        },
        setOpenDraw (state, { payload }) {
            return { ...state, isOpenDraw: payload };
        }
    },
};

export default cart;
