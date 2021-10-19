import Mock from 'mockjs'//ES6写法
import data from './products';

//模拟延迟
Mock.setup({
    timeout: 50
})
//生成随机数据
Mock.mock("https://getProduct/basic/ifno", () => data)