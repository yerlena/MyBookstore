import { useEffect, useRef, useState } from 'react';
import { getTotalItems, getVolumesBasicInfo } from './utils';
import { VolumeData } from '../../../components/Volume/Volume';
import { MAX_ALLOWED_ITEMS_PER_REQUEST } from '../../../constants/app.constants';
import { formatTime } from '../../../utils/retry';
import { useStoreContext } from '..';
import { StoreActionTypes } from '../constants';

const TTL_IN_MS = 100
  * 60 * 1000

export interface VolumesState {
  totalPages: number;
  volumesTitleAndImage: VolumeData[];
}

const useStore = (pageSize: number = 50) => {
  const [totalVolumes, setTotalVolumes] = useState(0)
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false)
  const [isFirstPageLoaded, setIsFirstPageLoaded] = useState(false)
  const [volumes, setVolumes] = useState<VolumeData[]>([]);
  const [isDataExpired, setIsDataExpired] = useState(false)
  const refreshTimer = useRef<ReturnType<typeof setTimeout>>();
  const { dispatch, startLoad, lastToLoad, loadedCallback } = useStoreContext();
  let accumulatedData: any[] = []

  const accumulateVolumesBasicData = (data: any[]) => {
    data?.forEach((item: any) => accumulatedData.push(item))
    if (lastToLoad && accumulatedData.length>=lastToLoad)
      loadedCallback(true)
    if (accumulatedData.length == totalVolumes) {
      setIsAllDataLoaded(true)
      setIsFirstPageLoaded(true)
      setVolumes(accumulatedData)
    }
    else if (accumulatedData.length >= pageSize) {
      setIsFirstPageLoaded(true)
      setVolumes(accumulatedData)
    }
  }

  const getTotalVolumes = () => {
    getTotalItems(setTotalVolumes)
  }

  const update = () => {
    if (!totalVolumes)
      return
    console.log(`Total Volumes: ${totalVolumes}`)

    const expirationDate = new Date(Date.now() + TTL_IN_MS);
    console.log(
      `Current data will expire at ${formatTime(expirationDate)}`,
    );
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      console.log('Refreshing data');
      setIsDataExpired(true)
    }, TTL_IN_MS * (3 / 4));
  }

  useEffect(() => {
    update()

    dispatch({
      type: StoreActionTypes.START_LOADING,
      payload: {
        isLoadingInProgress: true,
      }
    });

    fetchVolumesBasicInfo()
  }, [totalVolumes]);

  useEffect(() => {
    setIsDataExpired(false)
    getTotalVolumes()
  }, [isDataExpired]);

  useEffect(() => {
    getTotalVolumes()
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, []);

  useEffect(() => {
    if (startLoad) {
     // fetchVolumesBasicInfo(startIndex, size)
      dispatch({
        type: StoreActionTypes.START_LOADING,
        payload: {
          isLoadingInProgress: true,
        }
      });
    }

  }, [startLoad])


  async function fetchVolumesBasicInfo(startIndex: number = 0, maxVolumesToLoad: number = totalVolumes) {
     for (let index = startIndex; index < maxVolumesToLoad; index += MAX_ALLOWED_ITEMS_PER_REQUEST) {
      getVolumesBasicInfo(index, MAX_ALLOWED_ITEMS_PER_REQUEST, accumulateVolumesBasicData);
    } 
  }

  return {
    totalVolumes,
    isAllDataLoaded,
    isFirstPageLoaded,
    volumes
  }
}

export default useStore;