import React from "react";
import { Checkbox } from 'antd';
import { connect } from 'dva';

const filter = ({dispatch, model}) => {
    const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
    const option = availableSizes.map(v => {
        return {
            label: v,
            value: v
        }
    })
    const setFilters = (v) => {
        dispatch({ type: 'model/setFilters', payload: v })
    }
    return (
        <>
            <div>111</div>
            <Checkbox.Group options={option} onChange={(v) => setFilters(v)} />
        </>
    )
}
// export default filter;
export default connect(({ model }) => ({
    model,
  }))(filter); 

// const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
// const option = availableSizes.map(v => {
//     return {
//         label: v,
//         value: v
//     }
// })
// // @connect(({ model }) => ({ model }))
// class Filter extends Component {
    
//     setFilters = (v) => {
//         const {dispatch} = this.props;
//         // dispatch({});
//         dispatch({ type: 'model/setFilters', payload: v })
//     }
//     render() {
//         return (
//             <>
//                 <div>111</div>
//                 <Checkbox.Group options={option} onChange={(v) => this.setFilters(v)} />
//             </>
//         )
//     }
// }
// export default connect(({ model }) => ({
//     model,
//   }))(Filter); 