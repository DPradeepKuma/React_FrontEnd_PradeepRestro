import React,{useState,useEffect} from 'react'
import { API_URL } from '../helpers_utilitys/ApiPath';

const AllProducts = () => {
  const [products , setProducts ]= useState([]);
  const [loading, setLoading] = useState(true);
    const productHandler = async (e) => {
      setLoading(true);
      const firmId = localStorage.getItem('firmId');
      if (!firmId) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}product/products/${firmId}`);
        const newProductsData = await response.json();
        if (!response.ok) {
          console.error('failed to fetch products', newProductsData);
          setProducts([]);
          return;
        }
        setProducts(Array.isArray(newProductsData.products) ? newProductsData.products : []);
        console.log(newProductsData);
      } catch (error) {
        console.error('failed to fetch products', error);
        alert('Failed to fetch the products');
      } finally {
        setLoading(false);
      }
    }


    useEffect(()=>{
      productHandler();
      console.log('this is use effect')

      //in order to show product without refresh the tab
      const onProductAdded = (e) => {
        const newProduct = e.detail;
        if (!newProduct) return;
        setProducts((prev) => [newProduct, ...prev]);
      };

      window.addEventListener('product-added', onProductAdded);
      return () => window.removeEventListener('product-added', onProductAdded);
    },[])


    const deleteProductById = async(productId)=>{
      try {
        const response = await fetch(`${API_URL}product/${productId}`,{
          method:'DELETE'
        })
        if(response.ok){
          setProducts(products.filter(product=>product._id !== productId));
          confirm("are you sure? you want to delete?");
          alert("product deleted successfully");
        }
      } catch (error) {
        console.error("failed to delete product");
        alert("failed to delete product")
      }
    }


  return (
    <div>
      {/* in order to avoid the 1second inorder to give output or alternative from here to */}
      {loading ? (
        <p className='productLoading'>Loading products...</p>
      ) : products.length === 0 ? (
        <p className='productLoading'>No products added</p>
        // till here
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
              
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img src={`${API_URL}uploads/${item.image}`} alt={item.productName} style={{ width: '70px', height: '70px' }} />
                  )}
                </td>
                <td>
                  <button onClick={() => deleteProductById(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts
