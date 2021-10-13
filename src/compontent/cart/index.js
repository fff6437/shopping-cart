import React from 'react';
import { connect } from 'dva';



const Sort = (model,loading) => {
    console.log(model);
    console.log(loading);


   return (
        <div className="sort">
            测试333333333333333333333
        </div>
   ) 
  
};

export default connect(({ model,loading }) => ({
    model,loading
  }))(Sort); 