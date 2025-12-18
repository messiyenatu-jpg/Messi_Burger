import React, { useState, useEffect } from 'react';
import { menuAPI } from '../services/api';
import { useCart } from '../context/CartContext';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchMenuItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMenuItems = async () => {
    try {
      const response = await menuAPI.getAllItems();
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      // Fallback to static data if API fails
      setMenuItems(getStaticMenuItems());
      setLoading(false);
    }
  };

  const getStaticMenuItems = () => [
    // Burgers
    { id: 1, name: 'Classic Beef Burger', description: 'Juicy beef patty with lettuce, tomato, and special sauce', price: 250.00, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop' },
    { id: 2, name: 'Cheeseburger Deluxe', description: 'Beef patty with melted cheddar, pickles, and onions', price: 280.00, category: 'Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop' },
    { id: 3, name: 'Double Patty Burger', description: 'Two beef patties with double cheese and bacon', price: 350.00, category: 'Burgers', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop' },
    { id: 4, name: 'Chicken Burger', description: 'Crispy chicken breast with avocado and mayo', price: 220.00, category: 'Burgers', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=200&fit=crop' },
    { id: 5, name: 'Spicy Chicken Burger', description: 'Spicy chicken fillet with jalapeños and hot sauce', price: 240.00, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=300&h=200&fit=crop' },
    { id: 6, name: 'Veggie Burger', description: 'Plant-based patty with fresh greens and hummus', price: 190.00, category: 'Burgers', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop' },
    { id: 7, name: 'BBQ Bacon Burger', description: 'Beef patty with BBQ sauce, bacon, and onion rings', price: 320.00, category: 'Burgers', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop' },
    { id: 8, name: 'Fish Burger', description: 'Crispy fish fillet with tartar sauce and lettuce', price: 260.00, category: 'Burgers', image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=300&h=200&fit=crop' },
    
    // Sides
    { id: 9, name: 'French Fries', description: 'Crispy golden fries with sea salt', price: 80.00, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop' },
    { id: 10, name: 'Onion Rings', description: 'Crispy battered onion rings', price: 90.00, category: 'Sides', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=200&fit=crop' },
    { id: 11, name: 'Chicken Wings', description: 'Spicy buffalo chicken wings (6 pieces)', price: 180.00, category: 'Sides', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=200&fit=crop' },
    { id: 12, name: 'Mozzarella Sticks', description: 'Fried mozzarella sticks with marinara sauce', price: 120.00, category: 'Sides', image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=300&h=200&fit=crop' },
    
    // Drinks
    { id: 13, name: 'Coca Cola', description: 'Refreshing cold Coca Cola', price: 40.00, category: 'Drinks', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop' },
    { id: 14, name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 60.00, category: 'Drinks', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop' },
    { id: 15, name: 'Milkshake Vanilla', description: 'Creamy vanilla milkshake', price: 100.00, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop' },
    { id: 16, name: 'Ethiopian Coffee', description: 'Traditional Ethiopian coffee', price: 50.00, category: 'Drinks', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop' },
    
    // Desserts
    { id: 17, name: 'Chocolate Cake', description: 'Rich chocolate cake slice with cream', price: 150.00, category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop' },
    { id: 18, name: 'Ice Cream Sundae', description: 'Vanilla ice cream with chocolate sauce', price: 120.00, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop' },
    { id: 19, name: 'Apple Pie', description: 'Homemade apple pie with cinnamon', price: 130.00, category: 'Desserts', image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?w=300&h=200&fit=crop' },
    { id: 20, name: 'Cheesecake', description: 'New York style cheesecake', price: 160.00, category: 'Desserts', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=200&fit=crop' }
  ];

  const categories = ['All', 'Burgers', 'Sides', 'Drinks', 'Desserts'];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`Added ${item.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading delicious menu...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Menu Hero Section */}
      <header className="bg-danger text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">OUR DELICIOUS MENU</h1>
          <p className="lead">Choose from our wide variety of mouth-watering items</p>
        </div>
      </header>

      {/* Menu Categories */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="text-center">
            <div className="btn-group flex-wrap" role="group">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  className={`btn ${selectedCategory === category ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredItems.map(item => (
              <div key={item.id} className="col">
                <div className="card h-100 shadow-sm burger-card">
                  <img 
                    src={item.image} 
                    className="card-img-top burger-image" 
                    alt={item.name}
                    style={{height: '200px', objectFit: 'cover'}}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop';
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-danger">{item.name}</h5>
                    <p className="card-text text-secondary flex-grow-1">{item.description}</p>
                    <div className="text-center mb-3">
                      <span className="price-badge h5">{item.price.toFixed(2)} Birr</span>
                    </div>
                    <div className="d-grid">
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleAddToCart(item)}
                      >
                        <i className="fas fa-cart-plus"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;