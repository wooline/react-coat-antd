export function pagination(list: any[], pageSize: number, page: number) {
  if (page < 1) {
    page = 1;
  }
  if (pageSize > 10) {
    pageSize = 10;
  }
  const total = list.length;
  const totalPage = Math.ceil(list.length / pageSize);
  if (page > totalPage) {
    page = totalPage;
  }
  list = list.slice((page - 1) * pageSize, page * pageSize);
  return {list, pageSize, page, totalPage, total};
}
