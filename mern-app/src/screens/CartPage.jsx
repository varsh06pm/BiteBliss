// import React from 'react';
// import { useCart } from '../components/ContextReducer';
// import Delete from '@material-ui/icons/Delete';

// export default function CartPage() {
//   let data = useCart();

//   if (data.length === 0) {
//     return (
//       <div>
//         <div className='m-5 w-100 text-center fs-3'>Your cart is empty</div>
//       </div>
//     );
//   }

//   let totalPrice = data.reduce((total, food) => total + food.price, 0);

//   return (
//     <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
//       <table className='table table-hover'>
//         <thead className='text-success fs-4'>
//           <tr>
//             <th scope='col'>#</th>
//             <th scope='col'>Name</th>
//             <th scope='col'>Quantity</th>
//             <th scope='col'>Option</th>
//             <th scope='col'>Amount</th>
//             <th scope='col'></th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((food, index) => (
//             <tr key={index}>
//               <th scope='row'>{index + 1}</th>
//               <td>{food.name}</td>
//               <td>{food.qty}</td>
//               <td>{food.size}</td>
//               <td>{food.price}</td>
//               <td>
//                 <button
//                   type='button'
//                   className='btn p-0'
//                 >
//                   <Delete
//                     onClick={() => {
//                       // Implement your logic for removing items from the cart
//                     }}
//                   />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         <h1 className='fs-2'>Total Price: ₹{totalPrice}</h1>
//       </div>
//       <div>
//         {/* Implement your checkout button logic */}
//         <button className='btn bg-success mt-5'>Check Out</button>
//       </div>
//     </div>
//   );
// }
