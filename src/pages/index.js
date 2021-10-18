import React from 'react';

import Filter from '../compontent/filter';
import ProductList from '../compontent/productList';
import Carts from '../compontent/cart';
import 'antd/dist/antd.css';
// import 'antd/dist/antd.less';
import './index.less';

const App = () => (
    <React.Fragment>
        <Carts />
        <main>
            <Filter />
            <ProductList />
        </main>
    </React.Fragment>
);

export default App;
