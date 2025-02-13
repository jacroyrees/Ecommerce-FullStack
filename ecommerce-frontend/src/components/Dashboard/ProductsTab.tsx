import { useState, useEffect } from 'react';
import { Stack, Group, TextInput, Button, Card, Title, ActionIcon, Select, Checkbox, Image, SimpleGrid, Text } from "@mantine/core";
import { IconSearch, IconEdit, IconTrash, IconCheck } from "@tabler/icons-react";

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [includePriceRange, setIncludePriceRange] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    // Fetch products from /products
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8091/products');
        if (!response.ok) {
          throw new Error(`Products response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch categories from /categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8091/categories');
        if (!response.ok) {
          throw new Error(`Categories response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.currentTarget.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.currentTarget.value);
  };

  const handleIncludePriceRangeChange = (event) => {
    setIncludePriceRange(event.currentTarget.checked);
  };

  const handleUpdateFilters = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category.name === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (includePriceRange && priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(filtered);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setPriceRange('');
    setIncludePriceRange(false);
    setFilteredProducts(products);
  };

  const handleCategoryUpdate = async (productId, newCategory) => {
    try {
      const response = await fetch(`http://localhost:8091/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: newCategory })
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      // Update the product category in the state
      setProducts(products.map(product => 
        product.id === productId ? { ...product, category: { name: newCategory } } : product
      ));
      setFilteredProducts(filteredProducts.map(product => 
        product.id === productId ? { ...product, category: { name: newCategory } } : product
      ));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;

    try {
      const response = await fetch('http://localhost:8091/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory })
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const addedCategory = await response.json();
      setCategories([...categories, addedCategory]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditedProduct(product);
  };

  const handleSaveProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8091/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct)
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      // Update the product in the state
      setProducts(products.map(product => 
        product.id === productId ? editedProduct : product
      ));
      setFilteredProducts(filteredProducts.map(product => 
        product.id === productId ? editedProduct : product
      ));
      setEditingProductId(null);
      setEditedProduct({});
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProduct({ ...editedProduct, [field]: value });
  };

  return (
    <Stack spacing="md">
      <Group position="apart">
        <TextInput
          placeholder="Search by name..."
          icon={<IconSearch size={16} />}
          style={{ width: '300px' }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button>Add New Product</Button>
      </Group>

      {/* Filters Card */}
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Title order={3} mb="md">Filters</Title>
        <Stack>
          <Select
            placeholder="Filter by category"
            data={categories.map(category => ({ value: category.name, label: category.name }))}
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          <Group>
            <TextInput
              placeholder="Filter by price range (e.g., 10-100)"
              value={priceRange}
              onChange={handlePriceRangeChange}
              disabled={!includePriceRange}
            />
            <Checkbox
              label="Include Price Range"
              checked={includePriceRange}
              onChange={handleIncludePriceRangeChange}
            />
          </Group>
          <Group>
            <Button variant="light" onClick={handleUpdateFilters}>Update Filters</Button>
            <Button variant="light" onClick={handleClearFilters}>Clear Filters</Button>
          </Group>
        </Stack>
      </Card>

      {/* Add New Category */}
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Title order={3} mb="md">Add New Category</Title>
        <Group>
          <TextInput
            placeholder="New category name"
            value={newCategory}
            onChange={(event) => setNewCategory(event.currentTarget.value)}
          />
          <Button onClick={handleAddCategory}>Add Category</Button>
        </Group>
      </Card>

      {/* Products Grid */}
      <SimpleGrid cols={3} spacing="lg">
        {filteredProducts.map((product) => (
          <Card key={product.id} shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={product.imageUrl} alt={product.title} height={160} fit='fill'/>
            </Card.Section>
            {editingProductId === product.id ? (
              <>
                <TextInput
                  placeholder="Product name"
                  value={editedProduct.title}
                  onChange={(event) => handleInputChange('title', event.currentTarget.value)}
                />
                <TextInput
                  placeholder="Product price"
                  value={editedProduct.price}
                  onChange={(event) => handleInputChange('price', event.currentTarget.value)}
                />
                <Select
                  placeholder="Change category"
                  data={categories.map(category => ({ value: category.name, label: category.name }))}
                  value={editedProduct.category?.name || editedProduct.category}
                  onChange={(newCategory) => handleInputChange('category', newCategory)}
                />
                <ActionIcon color="green" variant="subtle" onClick={() => handleSaveProduct(product.id)}>
                  <IconCheck size={16} />
                </ActionIcon>
              </>
            ) : (
              <>
                <Title order={4} mt="md">{product.title}</Title>
                <Text mt="xs">Category: {product.category?.name || product.category}</Text>
                <Text mt="xs">Price: ${product.price}</Text>
                <Group mt="md" spacing={8}>
                  <ActionIcon color="blue" variant="subtle" onClick={() => handleEditProduct(product)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" variant="subtle">
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </>
            )}
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default ProductsTab;