import axios from 'axios';
import { API_KEY, baseURLs } from '../constants/app.constants';

const baseVolumesRequest = `${baseURLs.volumes}?q=cyber+subject&key=${API_KEY}`
const basicVolumeInfo = "fields=items(id,volumeInfo/title,volumeInfo/imageLinks/smallThumbnail)"

/* https://www.googleapis.com/books/v1/volumes?q=cyber&fields=kind,totalItems
{
  "kind": "books#volumes",
  "totalItems": 465
}
 */
export async function requestTotalItems(): Promise<any> {
  return axios.get(`${baseVolumesRequest}&fields=kind,totalItems`);
}

/* https://www.googleapis.com/books/v1/volumes?q=cyber+subject&maxResults=3&startIndex=0&fields=items(volumeInfo/title,volumeInfo/imageLinks) */

export async function requestVolumesBasicInfo(startIndex: number, pageSize: number): Promise<any> {
  return axios.get(`${baseVolumesRequest}&maxResults=${pageSize}&startIndex=${startIndex}&${basicVolumeInfo}`);
}
