import { Configuration, BookApi } from '@api-client/index';

const configuration = new Configuration({
  basePath: window.location.origin,
});

const bookApi = new BookApi(configuration);

export default bookApi;
