import { requestTotalItems, requestVolumesBasicInfo } from '../../../services/volume.service';

const validateResponse = (response: any) => {
  if (response.data && Object.keys(response.data).length)
    return response.data.items
  else return undefined 
}

export const getTotalItems = (
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
) => {
   requestTotalItems()
    .then(({ data }) => {
      setTotalItems(data.totalItems);
    })
    .catch((error) => {
      console.log('Failed to get total items', error);
    }); 
};

export const getVolumesBasicInfo = (startIndex: number, pageSize: number,
  accumulateData: (data: any[]) => void
) => {
   requestVolumesBasicInfo(startIndex, pageSize)
    .then((result) => {
      const validData = validateResponse(result)
      if (validData) {
        accumulateData(validData)
      } 
     })
    .catch((error) => {
      console.log('Failed to get volumes', error);
    }); 
};