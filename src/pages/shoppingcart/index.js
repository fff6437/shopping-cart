import React from 'react';

import Filter from './filter';
import ProductList from './productList';
import Carts from './cart';
import 'antd/dist/antd.css';
import './index.less';

const ShopList = () => (
    <React.Fragment>
        <Carts />
        <main>
            <Filter />
            <ProductList />
        </main>
    </React.Fragment>
);

export default ShopList;
