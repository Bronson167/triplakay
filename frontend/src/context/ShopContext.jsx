import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

// 🔹 Helper pour localStorage avec expiration
const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
    
      return null;
    }
    return item.value;
  } catch (err) {
    localStorage.removeItem(key);
    return null;
  }
};

const ShopContextProvider = (props) => {
  const currency = "Goud";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [slides, setSlides] = useState([]);
  const [marketingSlides, setMarketingSlides] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortType, setSortType] = useState("relavent");
 const [loadingUser, setLoadingUser] = useState(true);

const [shops, setShops] = useState([]);


useEffect(() => {
  fetchShops();
}, []);

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [userAccountType, setUserAccountType] = useState("normal");

  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [productsCountByCategory, setProductsCountByCategory] = useState({});
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const [booksCountByCategory, setBooksCountByCategory] = useState({});

  const [electronicProducts, setElectronicProducts] = useState([]);
  const limit = 10;

  const navigate = useNavigate();

  // 🔹 TTL recommandés
  const TTL = {
    slides: 1000 * 60 * 1440, // 1j
    marketingSlides: 1000 * 60 * 1440, // 1j
    featuredProducts: 1000 * 60 * 60, // 1h
    categoryData: 1000 * 60 * 60, // 1h
    user: 1000 * 60 * 1440, // 1j
    userAccountType: 1000 * 60 * 1440, // 1j
    search: 1000 * 60 * 5, // 5 min
  };

  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUserId = localStorage.getItem("userId");

  if (savedToken) setToken(savedToken);
  if (savedUserId) setUserId(savedUserId);
}, []);


  // 🔹 Récupération des slides
  const fetchSlides = async () => {
    if (slides.length > 0) return slides;

    const saved = getWithExpiry("slides");
    if (saved) {
      setSlides(saved);
      return saved;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/product/slides`);
      if (response.data.success) {
        setSlides(response.data.slides);
        setWithExpiry("slides", response.data.slides, TTL.slides);
        return response.data.slides;
      } else {
        toast.error("Tanpri verifye koneksyon entènèt ou.");
        return [];
      }
    } catch (error) {
      toast.error("Erè sèvè : " + error.message);
      return [];
    }
  };

  useEffect(() => {
    if (slides.length === 0) fetchSlides();
  }, []);

  // 🔹 Featured Products
  // const fetchFeaturedProducts = async (limit = 20, startAfter = null) => {
  //   if (featuredProducts.length > 0 && !startAfter) return featuredProducts;

  //   const saved = getWithExpiry("featuredProducts");
  //   if (saved) {
  //     setFeaturedProducts(saved);
  //     return saved;
  //   }

  //   try {
  //     let url = `${backendUrl}/api/product/featured?limit=${limit}`;
  //     if (startAfter) url += `&startAfter=${startAfter}`;

  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (data.success) {
  //       setFeaturedProducts(data.products);
  //       setWithExpiry("featuredProducts", data.products, TTL.featuredProducts);
  //       return data.products;
  //     } else {
  //       console.error(data.message);
  //       return [];
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors du chargement des produits vedette", error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   fetchFeaturedProducts();
  // }, []);

  // 🔹 Featured Products
const fetchFeaturedProducts = async (limit = 10, startAfter = null) => { // ← limite réduite à 12
  if (featuredProducts.length > 0 && !startAfter) return featuredProducts;

  const saved = getWithExpiry("featuredProducts");
  if (saved) {
    setFeaturedProducts(saved);
    return saved;
  }

  try {
    let url = `${backendUrl}/api/product/featured?limit=${limit}`;
    if (startAfter) url += `&startAfter=${startAfter}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      setFeaturedProducts(data.products);
      setWithExpiry("featuredProducts", data.products, TTL.featuredProducts);
      return data.products;
    } else {
      console.error(data.message);
      return [];
    }
  } catch (error) {
    console.error("Erreur lors du chargement des produits vedette", error);
    return [];
  }
};


//shops 
const fetchShops = async (limit = 12) => {
  try {
    const res = await axios.get(`${backendUrl}/api/product/listShops?limit=${limit}`);
    if (res.data.success) {
      setShops(res.data.shops);
    }
  
    
  } catch (err) {
    console.error("Erreur lors du chargement des boutiques", err);
  }
};


  // 🔹 Marketing slides
  const fetchMarketingSlides = async () => {
    if (marketingSlides.length > 0) return marketingSlides;

    const saved = getWithExpiry("marketingSlides");
    if (saved) {
      setMarketingSlides(saved);
      return saved;
    }

    try {
      const res = await axios.get(`${backendUrl}/api/product/marketing`);
      if (Array.isArray(res.data)) {
        setMarketingSlides(res.data);
        setWithExpiry("marketingSlides", res.data, TTL.marketingSlides);
        return res.data;
      } else {
        console.error("Réponse inattendue pour marketing slides:", res.data);
        return [];
      }
    } catch (err) {
      console.error("Pa ka chaje afich yo:", err);
      return [];
    }
  };

  useEffect(() => {
    if (marketingSlides.length === 0) fetchMarketingSlides();
  }, []);

  useEffect(() => {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}, [token]);

useEffect(() => {
  if (userId) localStorage.setItem("userId", userId);
  else localStorage.removeItem("userId");
}, [userId]);


  // 🔹 User info
  useEffect(() => {
  const fetchUserAccountType = async () => {
    if (!token || !userId) {
      setLoadingUser(false);
      return;
    }

    const savedUser = getWithExpiry("user");
    const savedType = getWithExpiry("userAccountType");

    if (savedUser && savedType) {
      setUser(savedUser);
      setUserAccountType(savedType);
      setLoadingUser(false);
      return;
    }

    try {
      const response = await axios.get(
        `${backendUrl}/api/product/user/me/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const fetchedUser = response.data.user || null;
        const fetchedAccountType = response.data.accountType || "normal";

        setUser(fetchedUser);
        setUserAccountType(fetchedAccountType);

        if (fetchedUser) setWithExpiry("user", fetchedUser, TTL.user);
        setWithExpiry("userAccountType", fetchedAccountType, TTL.userAccountType);
      } else {
        throw new Error("Token invalide");
      }
    } catch (err) {
      console.error("Erreur récupération type de compte utilisateur:", err);

      // 🔹 Déconnexion propre
      setToken("");
      setUserId("");
      setUser(null);
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoadingUser(false);
    }
  };

  fetchUserAccountType();
}, [token, userId]);


  // 🔹 Products by category
  // const fetchProductsByCategory = async (categoryName, reset = false) => {
  //   try {
  //     const existing = categoryData[categoryName] || { products: [], nextCursor: null, hasMore: true };

  //     if (!reset && existing.products.length > 0) return existing.products;

  //     const saved = getWithExpiry(`categoryData_${categoryName}`);
  //     if (!reset && saved) {
  //       setCategoryData(prev => ({ ...prev, [categoryName]: saved }));
  //       return saved.products;
  //     }

  //     let url = `${backendUrl}/api/product/listProduct?limit=${limit}&category=${encodeURIComponent(categoryName)}`;
  //     if (!reset && existing.nextCursor) url += `&startAfterDate=${existing.nextCursor}`;
  //     if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`;

  //     const searchCacheKey = `search_${categoryName}_${search.trim()}`;
  //     const searchSaved = getWithExpiry(searchCacheKey);
  //     if (searchSaved) return searchSaved.products;

  //     const response = await axios.get(url);

  //     if (response.data.success) {
  //       const newProducts = response.data.products;
  //       const mergedProducts = reset ? newProducts : [...existing.products, ...newProducts];
  //       const updatedData = {
  //         products: mergedProducts,
  //         nextCursor: response.data.nextCursor,
  //         hasMore: response.data.nextCursor && newProducts.length === limit,
  //       };
  //       setCategoryData(prev => ({ ...prev, [categoryName]: updatedData }));
  //       setWithExpiry(`categoryData_${categoryName}`, updatedData, TTL.categoryData);
  //       setWithExpiry(searchCacheKey, updatedData, TTL.search); // Cache recherche
  //       return mergedProducts;
  //     } else {
  //       toast.error(response.data.message || "Nou pa rive chaje anons yo.");
  //       return [];
  //     }
  //   } catch (err) {
  //     toast.error("Erè sèvè : " + err.message);
  //     return [];
  //   }
  // };

  const fetchProductsByCategory = async (categoryName, startAfter = null) => {
  try {
    const existing = categoryData[categoryName] || { products: [], nextCursor: null, hasMore: true };

    // ⚡ Si pas de startAfter et déjà en mémoire, renvoyer les produits
    if (!startAfter && existing.products.length > 0) return existing.products;

    let url = `${backendUrl}/api/product/listProduct?limit=${limit}&category=${encodeURIComponent(categoryName)}`;
    if (startAfter) url += `&startAfterDate=${startAfter}`;
    if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`;

    const response = await axios.get(url);

    if (response.data.success) {
      const newProducts = response.data.products;
      const mergedProducts = startAfter ? [...existing.products, ...newProducts] : newProducts;

      const updatedData = {
        products: mergedProducts,
        nextCursor: response.data.nextCursor,
        hasMore: response.data.nextCursor && newProducts.length === limit,
      };

      setCategoryData(prev => ({ ...prev, [categoryName]: updatedData }));
      setWithExpiry(`categoryData_${categoryName}`, updatedData, TTL.categoryData);

      return mergedProducts;
    } else {
      toast.error(response.data.message || "Nou pa rive chaje anons yo.");
      return [];
    }
  } catch (err) {
    toast.error("Erè sèvè : " + err.message);
    return [];
  }
};
  // 🔹 Panier
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart && typeof parsedCart === "object") setCartItems(parsedCart);
      } catch (err) {
        console.error("Erreur parsing panier local:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    products,
    allProducts,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    categoryData,
    setCategoryData,
    fetchProductsByCategory,
    fetchBestSellers: async () => {
      try {
        const url = `${backendUrl}/api/product/list?bestSeller=true&limit=10`;
        const response = await axios.get(url);
        return response.data.success ? response.data.products : [];
      } catch {
        return [];
      }
    },
    marketingSlides,
    totalProductsCount,
    productsCountByCategory,
    totalBooksCount,
    booksCountByCategory,
    search,
    setSearch,
    sortType,
    setSortType,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart: async (productId) => {
      const cartData = { ...cartItems };
      cartData[productId] = (cartData[productId] || 0) + 1;
      setCartItems(cartData);
    },
    updateQuantity: async (productId, quantity) => {
      const cartData = { ...cartItems };
      if (quantity > 0) cartData[productId] = quantity;
      else delete cartData[productId];
      setCartItems(cartData);
    },
    clearCart: async () => setCartItems({}),
    getCartCount: () => Object.values(cartItems).reduce((acc, qty) => acc + qty, 0),
    getCartAmount: () => {
      let total = 0;
      for (const productId in cartItems) {
        const product = products.find(p => p._id === productId || p.id === productId);
        if (product) total += product.price * cartItems[productId];
      }
      return total;
    },
    token,
    setToken,
    userId,
    setUserId,
    user,
    userAccountType,
    currency,
    delivery_fee,
    backendUrl,
    navigate,
    shops,
    setShops,
    slides,
    fetchMarketingSlides,
    electronicProducts,
    fetchFeaturedProducts,
    fetchShops,
  };
  if (loadingUser) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
