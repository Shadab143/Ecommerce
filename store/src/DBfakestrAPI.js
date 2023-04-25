import { useState, useEffect } from "react";

export function DBfakestrAPI() {
    const [categories, setCategories] = useState([]);
    const [products , setProducts]  = useState([]);
    const [cartItems,setCartItems]  = useState([]);
    const[itemsCount,setItemsCount]  =useState([0]);

    function GetCartItemsCount(){
    setItemsCount(cartItems.Length);
    
     }

    function LoadCategories() {
        fetch('https://fakestoreapi.com/products/Categories')
            .then(response => response.json())
            .then(data => {
                data.unshift('all');
                setCategories(data);
            }
            )
    }
    function LoadProducts(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
    }

    useEffect(() => {
        LoadCategories();
        LoadProducts(`https://fakestoreapi.com/products`);
    }, [])

    function handleCategoryChange(e){
       if(e.target.value =='all'){
        LoadProducts(`https://fakestoreapi.com/products`);
       }else{
       LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
       }
    }

    function handleAddtoCart(e){
        alert('item Added to Cart')
      fetch(`https://fakestoreapi.com/products/${e.target.id}`)
      .then(response=> response.json())
      .then(data => 
        setCartItems(data)
        )
    }

    return (
        <div className="container-fluid">
            <header className=" bg-black  text-white text-center p-2">
                <h2> <span className="bi bi-cart"></span>Shopping Home</h2>
            </header>
            <section className="row">
                <nav className="col-2">
                    <div>
                        <label>Select a category</label>
                        <div>
                            <select onChange={handleCategoryChange} className="form-select">
                                {
                                    categories.map(category =>
                                        <option value={category} key={category} >{category.toUpperCase()}</option>
                                    )
                                }
                            </select>

                        </div>
                    </div>
                </nav>
                <main className="col-8 d-flex flex-wrap">
                    {
                        products.map(product =>
                            <div key={product.id} className="card m-2 p-2 w-25 ">
                                <img src={product.image} className="card-img-top " height="150" />
                                <div className="card-header" style={{height:'160px'}} >
                                    <p>{product.title}</p>
                                </div>
                                <div className="card-body">
                                    <dl>
                                        <dt>Prize</dt>
                                        <dd>{product.prize}</dd>
                                        <dt>Rating</dt>
                                        <dd><span className="bi bi-star-fill text-success"></span>
                                        {product.rating.rate} <span>{product.rating.count}</span></dd>
                                    </dl>
                                </div>
                                <div className="card-footer">
                                    <button id={product.id} onClick={handleAddtoCart} className="btn btn-danger w-100">Add to Cart <span className="bi bi-cart4"></span> </button>
                                </div>
                            </div>
                        )
                    }
                </main>
                <aside className="col-2">
                   <button className="btn btn-danger w-100 p-2 m-2">
                    <span className="bi bi-cart"></span>[{itemsCount}] Added Items</button>
                </aside>
            </section>

        </div>
    )
}