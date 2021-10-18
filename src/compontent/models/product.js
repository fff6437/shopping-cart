import axios from 'axios';

// import { productsAPI } from '../../utils';
// const productsAPI = 'https://getProduct/basic/ifno';
const productsAPI = 'https://www.fastmock.site/mock/fd1d8dc7aff43be7e515e9151120efd7/shopping-cart/product/list'
const compare = {
    lowestprice: (a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    },
    highestprice: (a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
    },
};

const fetchProducts = ({ filters, sortBy }) => {
    return axios
        .get(productsAPI)
        .then((res) => {
            console.log(res);
            let { products } = res.data;

            if (!!filters && filters.length > 0) {
                products = products.filter((p) =>
                    filters.find((f) =>
                        p.availableSizes.find((size) => size === f)
                    )
                );
            }
            if (!!sortBy) {
                products = products.sort(compare[sortBy]);
            }

            return products;
        })
        .catch((err) => {
            console.log('Could not fetch products. Try again later.');
            return [];
        });
};

const product = {
    namespace: 'product',
    state: {
        productList: [],
        filters: [],
        sortBy: {},
    },
    effects: {
        *getProduct ({ payload }, { call, put, select }) {
            const filters = yield select(state => state.product.filters);
            const sortBy = yield select(state => state.product.sortBy);
            const params = {
                filters,
                sortBy,
            };
            if (payload && payload.key === 'filters') {
                params.filters = payload.payload;
            } else if (payload && payload.key === 'sortBy') {
                params.sortBy = payload.payload;
            }
            const data = yield call(fetchProducts, params);
            yield put({ type: 'setProduct', payload: data });
        },
        *setFilters ({ payload }, { call, put }) {
            yield put({ type: 'setFilter', payload });
            yield put({
                type: 'getProduct',
                payload: { payload, key: 'filters' },
            });
        },
        *setSortBy ({ payload }, { call, put }) {
            yield put({ type: 'setSort', payload });
            yield put({
                type: 'getProduct',
                payload: { payload, key: 'sortBy' },
            });
        },
    },
    reducers: {
        setProduct (state, { payload }) {
            return { ...state, productList: payload };
        },
        setFilter (state, { payload }) {
            return { ...state, filters: payload };
        },
        setSort (state, { payload }) {
            return { ...state, sortBy: payload };
        },
    },
};

export default product;
