import React from 'react';

import Filter from './filter';
import Product from './product';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

const App = () => (
  <React.Fragment>
    <main>
      <Filter />
      <Product />
    </main>
  </React.Fragment>
);

export default App;
