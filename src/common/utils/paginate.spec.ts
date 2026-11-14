import { paginationMeta } from './paginate';
describe('paginationMeta', () => {
  it('calculates the number of pages', () => {
    expect(paginationMeta(21, 1, 10)).toEqual({ total: 21, page: 1, limit: 10, total_pages: 3 });
  });
});
