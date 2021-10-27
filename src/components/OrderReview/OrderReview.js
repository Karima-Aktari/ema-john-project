import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb'
import { useHistory } from 'react-router-dom';

const OrderReview = () => {
    // const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart();
    const history = useHistory();

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        // fakedb theke export kora hoise
        deleteFromDb(key);
    }

    const handleProceedToShipping = () => {
        history.push('/shipping');
        // setCart([]);
        // clearTheCart();
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                    ></ReviewItem>)
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedToShipping} className="btn-regular">Place order</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;