import React, { useEffect, useState } from 'react';
import Pages from '../Pages/Pages';
import SelectPageSizeButton from '../PageSizeButton/PageSizeButton';
import Spinner from '../shared-components/Spinner';
import Volumes from '../Volumes/Volumes';
import { useStoreContext } from '../../state/StoreState';
import { StoreActionTypes } from '../../state/StoreState/constants';
import ShoppingCartButton from '../ShoppingCartButton/ShoppingCartButton';
import { StyledHeader } from './styles';

const Store: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50)
  const { isFirstPageLoaded, totalVolumes, volumes, dispatch } = useStoreContext()
  const [totalPages, setTotalPages] = useState(0)
  const [firstDisplayed, setFirstDisplayed] = useState(0)
  const [lastDisplayed, setLastDisplayed] = useState(0)
  const [isPageReady, setIsPageReady] = useState(true)

  const changePageSize = (size: number) => {
    console.log('In changePageSize: ', size)
    setPageSize(size)
  }

  useEffect(() => {
    setTotalPages(Math.ceil(totalVolumes / pageSize))
    setFirstDisplayed((currentPage - 1) * pageSize)
    setLastDisplayed(Math.min(currentPage * pageSize, totalVolumes))

    if (isFirstPageLoaded && (volumes.length < lastDisplayed) || (volumes.length < firstDisplayed))
    setIsPageReady(false)
      dispatch({
        type: StoreActionTypes.SET_PAGE_TO_LOAD,
        payload: {
          lastToLoad: lastDisplayed,
          loadedCallback: setIsPageReady
        }
      });

  }, [totalVolumes, pageSize, currentPage, volumes, firstDisplayed, lastDisplayed, isFirstPageLoaded ])

  return (
    <div className="Store">
      <ShoppingCartButton />
      <StyledHeader> Books and Volumes</StyledHeader>
      {(!isFirstPageLoaded || !isPageReady) ? (<Spinner
        className="spinner-icon"
        size={20}
        color={'#CED0D2'}
      />) : (<Volumes data={volumes.slice(firstDisplayed, lastDisplayed)} />)}
      <SelectPageSizeButton currentPageSize={pageSize} handleSelected={changePageSize} />
      <Pages
        nPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Store;
