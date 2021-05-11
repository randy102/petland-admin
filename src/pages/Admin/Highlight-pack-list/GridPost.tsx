import RGrid from 'components/Shared/RGrid';
import React, { useState } from 'react';
import epochToString from 'utils/epochToString';
import { useFetch } from 'utils/request';
import Detail from './Detail';

export default function GridPost() {
  const [showDetail, setShowDetail] = useState(false);

  const [details, setDetails] = useState();

  const [res, { loading, refetch }] = useFetch({
    api: 'post/public/highlight',
    method: 'get',
  });

  function handleView(rows: any[]) {
    const data = {...rows[0]};
    data.vaccination = data.vaccination ? 'Có' : 'Không'
    setShowDetail(true)
    setDetails(data)
  }

  function handleCloseDetail() {
    setShowDetail(false)
    setDetails(undefined)
  }

  return (
    <>
      <RGrid
        loading={loading}
        data={res?.data?.map( (r: any) => {
          return {
            ...r,
            highlightExpired: epochToString(r.highlightExpired),
            createdName: r.createdUser.name,
          }
          }
        )}
        headDef={[
          { 
            type: 'refresh', 
            onClick: () => refetch() 
          },
          {
            type: 'detail',
            onClick: handleView,
          },
        ]}
        colDef={[
          { 
            dataIndex: 'name', 
            title: 'Tên', 
          },
          { 
            dataIndex: 'createdName', 
            title: 'Người tạo',
          },
          { 
            dataIndex: 'highlightExpired', 
            title: 'Ngày hết hạn của gói', 
          },
        ]}
      />
      <Detail showDetail={showDetail} onClose={handleCloseDetail} details={details} />
    </>
  );
}

