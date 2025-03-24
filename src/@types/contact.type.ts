export interface TContactListResponse {
    docs: TContactDetails[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number
    nextPage: number
  }
  
  export interface TContactDetails {
    _id: string
    name: string
    phone: string
    email: string
    _organizations: string[]
    status: string
    createdAt: string
    updatedAt: string
    __v: number
    id: string
  }
  