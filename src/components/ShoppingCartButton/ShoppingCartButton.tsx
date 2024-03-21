import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useStoreContext } from '../../state/StoreState';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

const ShoppingCartButton: React.FC = () => {
    const { t } = useTranslation();
    const title = t('shopping_cart')
    const { volumesInCart } = useStoreContext()
    const [isCartDisplayed, setIsCartDisplayed] = useState(false)

    const onClick = () => {
        setIsCartDisplayed(true)
    }
    
    return (
        <>
        { isCartDisplayed ? (<ShoppingCart setIsCartDisplayed={setIsCartDisplayed}/>) :
         (<Button variant="primary" onClick={onClick} disabled={!volumesInCart.length}>{`${title} ${volumesInCart.length}`}</Button>)}
        </>
    );
}

export default ShoppingCartButton;
