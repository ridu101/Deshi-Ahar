export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  status: 'Order Placed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  total: number;
  time: string;
  email: string;
}

export const CATEGORIES = ['All', 'Biryani', 'Kebabs', 'Curries', 'Appetizers', 'Desserts', 'Beverages'];

export const FOOD_ITEMS: FoodItem[] = [
  // Biryani
  { id: 'b1', name: 'Kacchi Biryani', price: 450, category: 'Biryani', image: 'https://images.unsplash.com/photo-1589302188045-391db6ffb8c4?w=500&q=80', description: 'Traditional mutton kacchi with basmati and potatoes.', rating: 4.9 },
  { id: 'b2', name: 'Chicken Dum Biryani', price: 380, category: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-0ecb1c1ec1bc?w=500&q=80', description: 'Aromatic chicken dum biryani with saffron.', rating: 4.7 },
  { id: 'b3', name: 'Beef Tehari', price: 350, category: 'Biryani', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&q=80', description: 'Mustard oil cooked beef tehari.', rating: 4.8 },
  { id: 'b4', name: 'Prawn Biryani', price: 550, category: 'Biryani', image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc38b?w=500&q=80', description: 'Spicy prawn biryani with jumbo shrimp.', rating: 4.6 },
  { id: 'b5', name: 'Hyderabadi Biryani', price: 420, category: 'Biryani', image: 'https://images.unsplash.com/photo-1631515233157-19d807dc0793?w=500&q=80', description: 'Hyderabadi style spicy biryani.', rating: 4.5 },
  { id: 'b6', name: 'Vegetable Biryani', price: 280, category: 'Biryani', image: 'https://images.unsplash.com/photo-1645177623570-520f3d65b014?w=500&q=80', description: 'Garden fresh vegetable biryani.', rating: 4.3 },
  { id: 'b7', name: 'Mutton Akni', price: 480, category: 'Biryani', image: 'https://images.unsplash.com/photo-1603960284033-9914dee44677?w=500&q=80', description: 'Traditional Sylheti mutton akni.', rating: 4.8 },
  { id: 'b8', name: 'Morog Polao', price: 400, category: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-0ecb1c1ec1bc?w=500&q=80', description: 'Slow cooked chicken polao.', rating: 4.7 },

  // Kebabs
  { id: 'k1', name: 'Seekh Kebab', price: 250, category: 'Kebabs', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80', description: 'Char-grilled minced mutton skewers.', rating: 4.6 },
  { id: 'k2', name: 'Chicken Tikka', price: 220, category: 'Kebabs', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80', description: 'Spicy grilled chicken chunks.', rating: 4.5 },
  { id: 'k3', name: 'Beef Boti Kebab', price: 280, category: 'Kebabs', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80', description: 'Marinated beef cubes charcoal grilled.', rating: 4.7 },
  { id: 'k4', name: 'Reshmi Kebab', price: 260, category: 'Kebabs', image: 'https://images.unsplash.com/photo-1628294895950-98301beaf78a?w=500&q=80', description: 'Silky smooth chicken malai kebabs.', rating: 4.8 },
  { id: 'k5', name: 'Galouti Kebab', price: 320, category: 'Kebabs', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&q=80', description: 'Melt-in-mouth Awadhi kebabs.', rating: 4.9 },
  { id: 'k6', name: 'Tandoori Chicken', price: 450, category: 'Kebabs', image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&q=80', description: 'Classic full tandoori chicken.', rating: 4.7 },
  { id: 'k7', name: 'Paneer Tikka', price: 200, category: 'Kebabs', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80', description: 'Grilled paneer with spices.', rating: 4.4 },
  { id: 'k8', name: 'Mutton Shami Kebab', price: 180, category: 'Kebabs', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80', description: 'Classic mutton shami patties.', rating: 4.6 },

  // Curries
  { id: 'c1', name: 'Butter Chicken', price: 350, category: 'Curries', image: 'https://images.unsplash.com/photo-1603894584134-f132f1782259?w=500&q=80', description: 'Creamy tomato based chicken curry.', rating: 4.8 },
  { id: 'c2', name: 'Beef Rezala', price: 320, category: 'Curries', image: 'https://images.unsplash.com/photo-1542362567-b03e002196z1?w=500&q=80', description: 'Yogurt based white beef curry.', rating: 4.7 },
  { id: 'c3', name: 'Mutton Rogan Josh', price: 480, category: 'Curries', image: 'https://images.unsplash.com/photo-1542362567-b03e002196a1?w=500&q=80', description: 'Kashmiri style slow cooked mutton.', rating: 4.9 },
  { id: 'c4', name: 'Palak Paneer', price: 250, category: 'Curries', image: 'https://images.unsplash.com/photo-1601050633647-81a3175c20d6?w=500&q=80', description: 'Spinach and cottage cheese curry.', rating: 4.5 },
  { id: 'c5', name: 'Dal Makhani', price: 180, category: 'Curries', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80', description: 'Rich creamy black lentils.', rating: 4.6 },
  { id: 'c6', name: 'Fish Bhuna', price: 300, category: 'Curries', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80', description: 'Fresh water fish in thick spicy sauce.', rating: 4.4 },
  { id: 'c7', name: 'Chicken Jalfrezi', price: 280, category: 'Curries', image: 'https://images.unsplash.com/photo-1589302188045-391db6ffb8c4?w=500&q=80', description: 'Spicy chicken with peppers.', rating: 4.5 },
  { id: 'c8', name: 'Shahi Paneer', price: 290, category: 'Curries', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80', description: 'Royal paneer curry with nuts.', rating: 4.7 },

  // Appetizers
  { id: 'a1', name: 'Fuchka', price: 100, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1601050633647-81a3175c20d6?w=500&q=80', description: 'Bengali style spicy street snack.', rating: 4.9 },
  { id: 'a2', name: 'Chicken Lollipop', price: 220, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae847?w=500&q=80', description: 'Indo-Chinese spicy chicken wings.', rating: 4.6 },
  { id: 'a3', name: 'Vegetable Samosa', price: 60, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1601050633647-81a3175c20d6?w=500&q=80', description: 'Crispy pastry with spicy veg filling.', rating: 4.3 },
  { id: 'a4', name: 'Prawn Tempura', price: 350, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1559742811-822873691df0?w=500&q=80', description: 'Crispy fried jumbo prawns.', rating: 4.7 },
  { id: 'a5', name: 'Spring Rolls', price: 150, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500&q=80', description: 'Crispy rolls with veg and meat.', rating: 4.4 },
  { id: 'a6', name: 'Paneer Pakora', price: 180, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80', description: 'Deep fried cottage cheese cubes.', rating: 4.5 },
  { id: 'a7', name: 'Onion Bhaji', price: 80, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1601050633647-81a3175c20d6?w=500&q=80', description: 'Crispy onion fritters.', rating: 4.2 },
  { id: 'a8', name: 'Chicken 65', price: 250, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae847?w=500&q=80', description: 'Deep fried spicy southern chicken.', rating: 4.8 },

  // Desserts
  { id: 'd1', name: 'Gulab Jamun', price: 80, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&q=80', description: 'Soft syrup dipped milk balls.', rating: 4.9 },
  { id: 'd2', name: 'Rasmalai', price: 120, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&q=80', description: 'Creamy milk dessert with saffron.', rating: 4.8 },
  { id: 'd3', name: 'Phirni', price: 100, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&q=80', description: 'Rice pudding with dry fruits.', rating: 4.7 },
  { id: 'd4', name: 'Mishti Doi', price: 90, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&q=80', description: 'Traditional sweetened yogurt.', rating: 4.9 },
  { id: 'd5', name: 'Gajar Ka Halwa', price: 150, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&q=80', description: 'Winter special carrot halwa.', rating: 4.7 },
  { id: 'd6', name: 'Kulfi', price: 70, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&q=80', description: 'Traditional Indian ice cream.', rating: 4.6 },
  { id: 'd7', name: 'Shahi Tukda', price: 180, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&q=80', description: 'Royal bread pudding.', rating: 4.8 },
  { id: 'd8', name: 'Cham Cham', price: 60, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&q=80', description: 'Colorful Bengali sweet.', rating: 4.5 },

  // Beverages
  { id: 'v1', name: 'Mango Lassi', price: 120, category: 'Beverages', image: 'https://images.unsplash.com/photo-1546173159-315724a9d86a?w=500&q=80', description: 'Sweet mango and yogurt drink.', rating: 4.9 },
  { id: 'v2', name: 'Badam Milk', price: 150, category: 'Beverages', image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=500&q=80', description: 'Almond infused cold milk.', rating: 4.7 },
  { id: 'v3', name: 'Fresh Lime Soda', price: 60, category: 'Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80', description: 'Refreshing lime with soda.', rating: 4.5 },
  { id: 'v4', name: 'Masala Tea', price: 40, category: 'Beverages', image: 'https://images.unsplash.com/photo-1544787210-2211d74fc282?w=500&q=80', description: 'Spiced Indian milk tea.', rating: 4.8 },
  { id: 'v5', name: 'Cold Coffee', price: 180, category: 'Beverages', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=500&q=80', description: 'Rich creamy cold coffee.', rating: 4.6 },
  { id: 'v6', name: 'Virgin Mojito', price: 140, category: 'Beverages', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80', description: 'Mint and lime mocktail.', rating: 4.4 },
  { id: 'v7', name: 'Falooda', price: 220, category: 'Beverages', image: 'https://images.unsplash.com/photo-1546173159-315724a9d86a?w=500&q=80', description: 'Ice cream and noodle beverage.', rating: 4.8 },
  { id: 'v8', name: 'Pink Tea', price: 80, category: 'Beverages', image: 'https://images.unsplash.com/photo-1544787210-2211d74fc282?w=500&q=80', description: 'Kashmiri noon chai.', rating: 4.7 },
];

export const ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Anindya Kabir',
    items: [{ name: 'Kacchi Biryani', quantity: 2, price: 450 }],
    status: 'Preparing',
    total: 900,
    time: '2 mins ago',
    email: 'anindya@example.com'
  },
  {
    id: 'ORD-002',
    customerName: 'Meghla Rahman',
    items: [{ name: 'Butter Chicken', quantity: 1, price: 350 }, { name: 'Naan', quantity: 2, price: 50 }],
    status: 'Order Placed',
    total: 450,
    time: '10 mins ago',
    email: 'meghla@example.com'
  },
  {
    id: 'ORD-003',
    customerName: 'Tanvir Hasan',
    items: [{ name: 'Seekh Kebab', quantity: 4, price: 250 }],
    status: 'Delivered',
    total: 1000,
    time: '1 hour ago',
    email: 'tanvir@example.com'
  },
  {
    id: 'ORD-004',
    customerName: 'Sadia Islam',
    items: [{ name: 'Mango Lassi', quantity: 3, price: 120 }],
    status: 'Out for Delivery',
    total: 360,
    time: '30 mins ago',
    email: 'sadia@example.com'
  },
  {
    id: 'ORD-005',
    customerName: 'Rifat Chowdhury',
    items: [{ name: 'Hyderabadi Biryani', quantity: 1, price: 420 }],
    status: 'Delivered',
    total: 420,
    time: '2 hours ago',
    email: 'rifat@example.com'
  },
];
