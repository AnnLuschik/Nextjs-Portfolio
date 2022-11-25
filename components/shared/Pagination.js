import ReactPaginate from 'react-paginate';

import styles from 'styles/Pagination.module.css';

const Pagination = ({ totalElements = 0, pageSize = 5, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <ReactPaginate
        breakLabel="..."
        onPageChange={({ selected }) => onPageChange(selected + 1, pageSize)}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(totalElements / pageSize)}
        nextLabel="&rarr;"
        previousLabel="&larr;"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
      />
    </div>
  );
};

export default Pagination;
