import {create} from 'dva-core-ts';
import models from '@/models/index';
import createLoading from 'dva-loading-ts';
// 创建实例
const app = create();
// 加载model对象
models.forEach((model) => {
  app.model(model);
});

app.use(createLoading());
// 启动 dva
app.start();

// 导出dva的数据
const store = app._store;
export default store;
