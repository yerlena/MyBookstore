import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export type PageSizeButtonProps = {
    currentPageSize: number;
    handleSelected: (size: number) => void;
};

const SelectPageSizeButton = ({ currentPageSize, handleSelected }: PageSizeButtonProps) => {
    const { t } = useTranslation();
    const title = t('select_page_size')
    const availablePageSizes = [{ label: '10', value: 10 }, { label: '25', value: 25 }, { label: '50', value: 50 }]

    return (
        <DropdownButton id="page-size-button" title={title} style={{ margin: '10px 10px 10px 10px' }}
        >
            <Dropdown onSelect={(eventKey: any, event: Object) => {
                handleSelected(eventKey)
            }}>
            {availablePageSizes.map((pageSize) => (
                    <Dropdown.Item eventKey={pageSize.value} active={currentPageSize == pageSize.value ? true : false}>{pageSize.label}</Dropdown.Item>
            ))}
            </Dropdown>
        </DropdownButton>
    );
}

export default SelectPageSizeButton;
