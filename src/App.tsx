import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import BookDetails from '@components/BookDetails';
import BookEdit from '@components/BookEdit';
import BookList from '@components/BookList';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout className="min-h-screen">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="books">
                <Link to="/books">Books</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content className="p-8">
            <Routes>
              <Route path="/" element={<div className="text-center text-2xl">Welcome to the Book Manager</div>} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/books/:id/edit" element={<BookEdit />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
