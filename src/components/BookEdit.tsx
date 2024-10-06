import { Form, Input, Button } from 'antd';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

import bookApi from '@api/index';
import { BookDetailsResponse, BookUpdateRequest } from '@api-client/index';

const BookEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading } = useQuery<BookDetailsResponse>(['book', id], async () => {
    const response = await bookApi.getBookById(Number(id));
    return response.data;
  });
  const mutation = useMutation((updatedBook: BookUpdateRequest) => bookApi.updateBook(Number(id), updatedBook), {
    onSuccess: () => {
      navigate(`/books/${id}`);
    },
  });

  if (isLoading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  const onFinish = (values: BookUpdateRequest) => {
    mutation.mutate(values);
  };

  return (
    <Form initialValues={book} onFinish={onFinish} className="p-8 bg-white shadow-md rounded-md">
      <Form.Item name="title" label="Title" className="mb-4">
        <Input className="border border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Form.Item name="price" label="Price" className="mb-4">
        <Input className="border border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Form.Item name="publicationDate" label="Publication Date" className="mb-4">
        <Input type="date" className="border border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="mt-4">
          Save
        </Button>
      </Form.Item>
      <Link to="/books">
        <Button className="mt-4 ml-4">Back to List</Button>
      </Link>
    </Form>
  );
};

export default BookEdit;
