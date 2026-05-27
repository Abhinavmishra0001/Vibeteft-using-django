const { useState, useEffect } = React;

const productsData = [
    { id: 1, name: "Street Hoodie", price: 1999, category: "hoodie", tag: "Best Seller", image: "/static/images/websitelogo2.png" },
    { id: 2, name: "Oversized T-Shirt", price: 999, category: "tshirt", tag: "Trending", image: "/static/images/websitelogo3.png" },
    { id: 3, name: "Caps", price: 499, category: "cap", tag: "", image: "/static/images/websitelogo4.png" },
    { id: 4, name: "Black Jeans", price: 1299, category: "jeans", tag: "", image: "/static/images/websitelogo5.png" },
    { id: 5, name: "White Hoodie", price: 1999, category: "hoodie", tag: "New", image: "/static/images/websitelogo6.png" },
    { id: 6, name: "Blue Jogger", price: 1299, category: "jeans", tag: "", image: "/static/images/websitelogo7.png" },
    { id: 7, name: "Sneakers", price: 1499, category: "shoes", tag: "Limited", image: "/static/images/websitelogo8.png" },
    { id: 8, name: "Wool Cap", price: 899, category: "cap", tag: "", image: "/static/images/websitelogo9.png" },
    { id: 9, name: "White Jeans", price: 1299, category: "jeans", tag: "", image: "/static/images/websitelogo10.png" }
];

function ProductCard({ product, addToCart }) {
    return (
        <div className="product-card" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div className="product-img-wrap">
                <img src={product.image} alt={product.name} />
                {product.tag && <span className="product-tag">{product.tag}</span>}
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                <button className="btn-add" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
}

function ProductGrid({ showFilters }) {
    const [filter, setFilter] = useState('all');

    const handleAddToCart = (product) => {
        const event = new CustomEvent('reactAddToCart', { detail: { product } });
        window.dispatchEvent(event);
    };

    const filteredProducts = filter === 'all'
        ? productsData
        : productsData.filter(p => p.category === filter);

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'hoodie', label: 'Hoodies' },
        { id: 'tshirt', label: 'T-Shirts' },
        { id: 'jeans', label: 'Jeans' },
        { id: 'cap', label: 'Caps' },
        { id: 'shoes', label: 'Shoes' }
    ];

    return (
        <React.Fragment>
            {showFilters && (
                <section className="shop-filters">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                            onClick={() => setFilter(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </section>
            )}

            <section className="products-section">
                {!showFilters && (
                    <div className="section-header">
                        <h2>Our Collection</h2>
                        <p>Handpicked essentials for the modern wardrobe</p>
                    </div>
                )}

                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} addToCart={handleAddToCart} />
                    ))}
                </div>
            </section>
        </React.Fragment>
    );
}

const rootElement = document.getElementById('react-products-root');
if (rootElement) {
    const showFilters = rootElement.getAttribute('data-show-filters') === 'true';
    ReactDOM.render(<ProductGrid showFilters={showFilters} />, rootElement);
}
