import React from 'react';
import { useQuery } from 'react-query';
import { Table, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

import bookApi from '@api/index';
import { BookListResponse } from '@api-client/index';

const { confirm } = Modal;

const BookList: React.FC = () => {
  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery<BookListResponse[]>('books', async () => {
    const response = await bookApi.getBooks();
    return response.data;
  });

  if (isLoading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  const showDeleteConfirm = (bookId: number) => {
    confirm({
      title: 'Are you sure you want to delete this book?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(bookId);
      },
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'id',
      render: (id: number) => (
        <span className="flex gap-4">
          <Link to={`/books/${id}`}>
            <Button>View</Button>
          </Link>
          <Link to={`/books/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Button danger onClick={() => showDeleteConfirm(id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleDelete = async (bookId: number) => {
    // Use API client to delete book
    await bookApi.deleteBook(bookId);
    refetch();
  };

  return <Table dataSource={books} columns={columns} rowKey="id" className="mt-8" />;
};

export default BookList;
