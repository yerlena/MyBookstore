import React from 'react'
import { useTranslation } from 'react-i18next';

export type PagesProps = {
    nPages: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const MAX_NUMBER_OF_PAGES_TO_DISPLAY = 15

const Pages = ({ nPages, currentPage, setCurrentPage }: PagesProps) => {
    const { t } = useTranslation();

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const goToNextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
    }

    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (
         <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link"
                        onClick={goToPrevPage}
                        style={{pointerEvents:currentPage !== 1 ? 'auto': 'none'}}>
                        {t('previous')}
                    </a>
                </li>
                { pageNumbers.length<MAX_NUMBER_OF_PAGES_TO_DISPLAY && pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
                        <a onClick={() => setCurrentPage(pgNumber)}
                            className='page-link'>
                            {pgNumber}
                        </a>
                    </li>
                ))} 
                <li className="page-item">
                    <a className="page-link"
                        onClick={goToNextPage}
                        style={{pointerEvents:currentPage !== nPages ? 'auto': 'none'}}>
                        {t('next')}
                    </a>
                </li>
            </ul>
        </nav> 
    ) 
}

export default Pages