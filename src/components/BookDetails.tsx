import React from 'react';
import { Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { BookDetailsResponse } from '@api-client/index';
import bookApi from '@api/index';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: book,
    isLoading,
    error,
  } = useQuery<BookDetailsResponse>(['book', id], async () => {
    const response = await bookApi.getBookById(Number(id));
    return response.data;
  });

  if (isLoading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">Book not found</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{book?.title}</h1>
      <p className="mb-2">ISBN: {book?.isbn}</p>
      <p className="mb-2">Price: {book?.price}</p>
      <p className="mb-2">Publication Date: {book?.publicationDate}</p>
      <Link to="/books">
        <Button type="primary" className="mt-4">
          Back to List
        </Button>
      </Link>
    </div>
  );
};

export default BookDetails;
