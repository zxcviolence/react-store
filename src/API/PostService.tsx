// В данный момент бизнес логика реализуется через асинхронные экшены редакса, код остался для примера

export default class PostService {
  static async getProducts(
    activePage: number,
    limit: number,
    activeCategory: number,
    activeSort: string,
    activeSortOrder: 'asc' | 'desc',
    searchValue: string,
  ) {
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
    const search = searchValue ? `&title_like=${searchValue}` : '';
    const url = `https://react-store-api.onrender.com/products?_page=${activePage}&_limit=${limit}${category}&_sort=${activeSort}&_order=${activeSortOrder}${search}`;
    const response = await fetch(url);
    const totalCount = await response.headers.get('X-Total-Count');
    const data = await response.json();
    return { data, totalCount };
  }

  static async getProductById(id: string) {
    const url = `https://react-store-api.onrender.com/products/${id}`;
    const response = await fetch(url);
    return await response.json();
  }
}
