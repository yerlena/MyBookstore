import { Card } from 'react-bootstrap'
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { useStoreContext } from '../../state/StoreState';
import { StoreActionTypes } from '../../state/StoreState/constants';

export type VolumeData = {
    id: string;
    volumeInfo: {
        title: string;
        imageLinks?: {
            smallThumbnail?: string;
        };
    }
}

const Volume = ({id, volumeInfo}: VolumeData) => {
    const { dispatch } = useStoreContext()
    
    const handleClicked = () => {
        dispatch({
            type: StoreActionTypes.ADD_VOLUME_TO_CART,
            payload: {
              id: id,
              volumeInfo: volumeInfo
            }
          });
    }

    return (
        <Card>
            {volumeInfo?.imageLinks?.smallThumbnail ? (<Card.Img src={volumeInfo?.imageLinks?.smallThumbnail} />) :
                (<Card.Img src={"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} />)}
            <Card.Body>
                <Card.Title>{volumeInfo.title}</Card.Title>
            </Card.Body>
            <AddToCartButton  handleClicked={handleClicked} />
        </Card>
    )
}

export default Volume