import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

export type AddToCartButtonProps = {
    handleClicked: () => void;
};

const AddToCartButton = ({ handleClicked }: AddToCartButtonProps) => {
    const { t } = useTranslation();
    const title = t('add_to_cart')

    const onClick = () => {
        handleClicked()
    }

    return (
        <Button variant="primary" onClick={onClick}>{title}</Button>
    );
}

export default AddToCartButton;
