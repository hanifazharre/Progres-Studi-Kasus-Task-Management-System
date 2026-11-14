export function paginationMeta(total: number, page: number, limit: number) {
  return { total, page, limit, total_pages: Math.ceil(total / limit) };
}
