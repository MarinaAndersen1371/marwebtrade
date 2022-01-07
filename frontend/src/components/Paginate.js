import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const Paginate = ({ pages, page }) => {
  const location = useLocation();
  const path = location.pathname;
  const baseURL =
    path.split("/page/")[0] === "/" ? "" : path.split("/page/")[0];

  if (pages <= 1) return null;

  return (
    <Pagination className='justify-content-center my-3'>
      {page >= 2 && (
        <LinkContainer to={`${baseURL}/page/${page - 1}`}>
          <Pagination.Item>
            <i className='fas fa-angle-double-left'></i>
          </Pagination.Item>
        </LinkContainer>
      )}
      {page >= 2 && (
        <LinkContainer to={`${baseURL}/page/${page - 1}`}>
          <Pagination.Item>{page - 1}</Pagination.Item>
        </LinkContainer>
      )}

      <LinkContainer to={`${baseURL}/page/${page}`}>
        <Pagination.Item active={page}>{page}</Pagination.Item>
      </LinkContainer>

      {pages - page > 0 && (
        <LinkContainer to={`${baseURL}/page/${page + 1}`}>
          <Pagination.Item>{page + 1}</Pagination.Item>
        </LinkContainer>
      )}

      {pages - page > 0 && (
        <LinkContainer to={`${baseURL}/page/${page + 1}`}>
          <Pagination.Item>
            <i className='fas fa-angle-double-right'></i>
          </Pagination.Item>
        </LinkContainer>
      )}
    </Pagination>
  );
};

export default Paginate;
