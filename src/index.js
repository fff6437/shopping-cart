import dva from 'dva';
// import './index.css';
import createLoading from 'dva-loading';
// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());
// 3. Model
app.model(require('./compontent/models/index').default);

// 4. Router
app.router(require('./compontent').default);

// 5. Start
app.start('#root');
