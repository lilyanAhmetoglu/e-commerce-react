import React from 'react';
import MyButton from '../utils/buttons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTruck} from '@fortawesome/free-solid-svg-icons/faTruck';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

import {colors} from '../utils/Forms/fixed_categories'

const ProdNfo = (props) => {

    const showProdTags = (detail) => (
        <div className="product_tags">
            { detail.shipping ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTruck}/></div>
                    <div className="tag_text">
                        <div>Free shipping</div>
                        <div>And return</div>
                    </div>
                </div>
            :null
            }
            { detail.available ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faCheck}/></div>
                    <div className="tag_text">
                        <div>Available</div>
                        <div>in store</div>
                    </div>
                </div>
            :
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTimes}/></div>
                    <div className="tag_text">
                        <div>Not Available</div>
                        <div>Preorder only</div>
                    </div>
                </div>
            }
        </div>
    )

    const showProdActions = (detail) => (
        <div className="product_actions">
            <div className="price">$ { detail.price }</div>
            <div className="cart">
                <MyButton
                    type="add_to_cart_link"
                    /*runAction={()=>{
                       props.addToCart(detail._id)
                    }}*/
                />
            </div>
        </div>
    )

    const showProdSpecifications = (detail) => (
        <div className="product_specifications">
            <h2>Specs:</h2>
            <div>
                <div className="item">
                    <strong>Fabric:</strong> {detail.fabric.name}
                </div>
                <div className="item">
                    <strong>Color:</strong>  {colors[detail.color].name}
                </div>
                <div className="item">
                    <strong>Category:</strong> {detail.category.name}
                </div>
            </div>
        </div>
    )


    const detail = props.detail;
    return (
        <div>
            <h1>{detail.brand.name} {detail.name}</h1>
            <p>
                {detail.description}
            </p>
            { showProdTags(detail)}
            { showProdActions(detail)}
            { showProdSpecifications(detail)}
        </div>
    );
};

export default ProdNfo;