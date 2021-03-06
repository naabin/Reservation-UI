export interface PageableResponse {
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}
