import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import axios from 'axios';

// // TODO: 리팩토링 예정

//

// const useMongoDB = (filter: keyof ScheduleAPIReturntype) => {
//   const [contents, setContents] = useState<ContentsDataType[]>([]);

//   const setData = () => {
//     if (!data) return;

//     const contents = [...data[filter].contents] as ContentsDataType[];
//     setContents(() => contents);
//   };

//   useEffect(() => {
//     if (data && status === 'success') {
//       //onSuccess
//       setData();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dataUpdatedAt, filter]);

//   return {
//     /** 필터링된 데이터 */
//     contents,
//     /** 원본 데이터 */
//     sheetData: data,
//     filter,
//     isLoadingSheet: isLoading,
//     refetchSheet: refetch,
//     sheetDataUpdatedAt: dataUpdatedAt,
//     isLoad,
//   };
// };

// export default useMongoDB;

export default async function getSchedule() {
  const response = await axios.get<ScheduleAPIReturntype>('/api/schedule');
  return response.data;
}
