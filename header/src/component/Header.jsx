import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'store/store'; 

function Header(props) {
    const { count, increment, clear } = useStore();

    const handleAddToCart = () => {
        increment(); 
    };

    return (
        <header style={{ backgroundColor: 'lightgray', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
                <h1>Header</h1>
            </div>
            <div>
                <button style={{ padding: '10px', fontSize: '16px' }} onClick={handleAddToCart}>
                    <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '10px' }} />
                    Cart ({count})
                </button>
            </div>
        </header>
    );
}

export default Header;
