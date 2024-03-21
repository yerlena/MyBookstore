import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Volume, { VolumeData } from "../Volume/Volume";
import { useEffect, useState } from 'react';

export type VolumesProps = {
    data: VolumeData[]
};

const Volumes = ({ data }: VolumesProps) => {
    const COLUMNS_NUMBER = 5

    const [rows, setRows] = useState<Array<number>>([])
    const cols = [...Array(COLUMNS_NUMBER).keys()]

    useEffect(() => {
        setRows([...Array(Math.ceil(data.length / COLUMNS_NUMBER)).keys()])
    }, [data.length])

    return (
            <Container style={{ margin: '30px 10px 10px 10px' }} >
                {rows.map(r => (<Row >
                    {cols.map(c => (<Col style={{ margin: '5px 5px 5px 5px' }}>
                        {data[r * COLUMNS_NUMBER + c] && (<Volume id={data[r * COLUMNS_NUMBER + c].id} volumeInfo={data[r * COLUMNS_NUMBER + c].volumeInfo} />)}
                    </Col>))}
                </Row>))
                }
            </Container>
    )
}

export default Volumes  