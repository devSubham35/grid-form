import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loader/Loading';
import { contactList } from '@/api/functions/contact/contact.api';
import AdvancedDataTable from '@/components/DataTable/AdvanceDataTable'
import PageWrapper from '@/components/Wrapper/PageWrapper';

const ContactList = () => {

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(1);

  console.log(search, "++66")


  const { data, isLoading } = useQuery({
    queryKey: ["contact-list", pageSize, page],
    queryFn: () =>
      contactList({
        page: String(page),
        limit: String(pageSize),
      }),
  });

  // const handleOperationSuccess = () => {
  //   refetch();
  // };

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  // handle page change
  const handlePageChnage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  // Handle filter
  const handleFilter = (statusVal: string) => {
    setStatus(statusVal);
    setPage(1);
  };

  // Handle Search
  const hanldeSearch = (search: string) => {
    setSearch(search);
    if (data && data.data.totalPages < page) {
      setPage(1);
    }
  };

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  // user Status change
  const handleStatusChange = (id: string) => {
    console.log(id)
  };

  // Delete user
  const handleDelete = (id: string) => {
    console.log(id)
  };

  // handle Bulk delete
  const handleBulkDelete = (ids: string[]) => {
    console.log(ids)
  };

  // handle Bulk delete
  const handleEdit = (id: string) => {
    console.log(id)
  };

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  if (isLoading || !data) {
    return <Loading />
  }

  return (
    <PageWrapper>
      <div className='w-full h-[70vh]'>
        <AdvancedDataTable
          data={data?.data?.docs || []}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          onPageChange={handlePageChnage}
          currentPage={page}
          totalPages={data.data?.totalPages}
          totalCount={data.data.pagingCounter}
          setStatusFilter={handleFilter}
          currentStatus={status}
          handleSearchItem={hanldeSearch}
          hiddenColumnKeys={[
            "createdAt", "_id", "_organizations", "id", "__v", "updatedAt"
          ]}
          // selectableColumnKey="name"
          exportedColumnKeys={[
            "name",
            "email",
            "phone",
            "status",
          ]}
          exportFileName="contact-list-data"
          onStatusChange={(data) => handleStatusChange(data._id)}
          onDelete={(data) => handleDelete(data._id)}
          onEdit={(data) => handleEdit(data._id)}
          onBulkDelete={(dataList) =>
            handleBulkDelete(dataList.map((data) => data._id))
          }
          isAssign={false}
          idDelete={true}
          isStatus={true}
          isEdit={true}
          isView={false}
          isCsv={true}
          // columnNames={{
          //   _organizations: "Organizations"
          // }}
          selectedAccess={""}
        />
      </div>
    </PageWrapper>
  )
}

export default ContactList