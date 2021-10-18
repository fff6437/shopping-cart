import dva from 'dva';
// import './mock/app';
// import './index.css';
import createLoading from 'dva-loading';
// 1. Initialize
const app = dva();



// 2. Plugins
app.use(createLoading());
// 3. Model
app.model(require('./models/product').default);
app.model(require('./models/carts').default);

// 4. Router
app.router(require('./pages').default);

// 5. Start
app.start('#root');
