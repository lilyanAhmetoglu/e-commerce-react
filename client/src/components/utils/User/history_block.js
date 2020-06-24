import React from 'react';
import moment from 'moment';

// {moment(product.dateOfPurchase).format("MM-DD-YYYY")}

const UserHistoryBlock = (props) => {


    const renderBlocks = () => (
        props.products ?
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td>{moment(product.dataOfPurchase).format("MM-DD-YYYY")}</td>
                    <td><b>{product.brand}</b> {product.name}</td>
                    <td>$ {product.price }</td>
                    <td>{product.quantity}</td>
                    <td>$ {product.quantity * product.price}</td>
                </tr>
            ))
        :null
    )

    return (
        <div className="history_blocks" >
            <table>
                <thead>
                    <tr>
                        <th>Order date</th>
                        <th>Product</th>
                        <th>Price paid</th>
                        <th>Quantity</th>
                        <th>Total Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    );
};

export default UserHistoryBlock;