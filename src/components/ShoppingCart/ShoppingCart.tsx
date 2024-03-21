import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Modal, ListGroup } from 'react-bootstrap'
import { useStoreContext } from '../../state/StoreState';

export type ShoppingCartProps = {
    setIsCartDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShoppingCart = ({ setIsCartDisplayed }: ShoppingCartProps) => {
    const { t } = useTranslation();
    const { volumesInCart, dispatch } = useStoreContext()
    const [show, setShow] = useState(true);

    const handleClose = () => { setShow(false); setIsCartDisplayed(false) }
    const handleCheckout = () => { handleClose() };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('shopping_cart')}</Modal.Title>
                </Modal.Header>
                <Modal.Body><Card>
                    <Card.Body>
                        <Card.Title>{`${volumesInCart.length} ${t('items_in_cart')}`}</Card.Title>
                        <ListGroup variant="flush">
                        {volumesInCart.map(v => (<ListGroup.Item>{v.volumeInfo.title}</ListGroup.Item>))}
                        </ListGroup>
                    </Card.Body>
                </Card></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    {t('close')}
                    </Button>
                    <Button variant="primary" onClick={handleCheckout} disabled={true}>
                    {t('checkout')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ShoppingCart