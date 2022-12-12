import ReactPagination from 'react-js-pagination';

const Pagination = ({
  totalElements = 0,
  pageSize = 5,
  pageNum,
  onPageChange
}) => {
  return totalElements > pageSize ? (
    <ReactPagination
      itemClass="page-item"
      linkClass="page-link"
      activePage={pageNum}
      itemsCountPerPage={pageSize}
      totalItemsCount={totalElements}
      pageRangeDisplayed={5}
      onChange={(page) => onPageChange(page, pageSize)}
    />
  ) : null;
};

export default Pagination;
