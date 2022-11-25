import ReactPaginate from 'react-paginate';

import styles from 'styles/Pagination.module.css';

const Pagination = ({ totalElements = 0, itemsPerPage = 5 }) => {
  return (
    <div className={styles.pagination}>
      <ReactPaginate
        breakLabel="..."
        onPageChange={() => {}}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(totalElements / itemsPerPage)}
        nextLabel="&rarr;"
        previousLabel="&larr;"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
      />
    </div>
  );
};

export default Pagination;
