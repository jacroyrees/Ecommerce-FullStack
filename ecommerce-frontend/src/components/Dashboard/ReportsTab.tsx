import { useState, useEffect } from 'react';
import { Card, Title, Group, Select, Table } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

const ReportsTab = () => {
  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    // Fetch purchase reports from /purchase-reports
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8091/purchase-reports');
        if (!response.ok) {
          throw new Error(`Reports response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
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
        setCategories([{ name: 'All Categories', value: 'all' }, ...data.map(category => ({ name: category.name, value: category.name }))]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchReports();
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const filteredReports = reports.filter(report => {
    const [startDate, endDate] = dateRange;
    const reportDate = new Date(report.localDate);

    const isWithinDateRange = (!startDate || reportDate >= startDate) && (!endDate || reportDate <= endDate);
    const isWithinCategory = selectedCategory === 'all' || report.category.name === selectedCategory;

    return isWithinDateRange && isWithinCategory;
  });

  console.log('Reports:', reports);
  console.log('Categories:', categories);
  console.log('Selected Category:', selectedCategory);
  console.log('Filtered Reports:', filteredReports);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={2} mb="md">Purchase Reports</Title>
      <Group mb="lg">
        <DatePickerInput
          label="Date Range"
          type="range"
          placeholder="Pick dates range"
          value={dateRange}
          onChange={handleDateRangeChange}
        />
        <Select
          label="Category"
          placeholder="Select category"
          data={categories.map(category => ({ value: category.value, label: category.name }))}
          value={selectedCategory}
          onChange={handleCategoryChange}
        />
      </Group>
      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Date</th>
            <th style={{ textAlign: 'left' }}>Product</th>
            <th style={{ textAlign: 'left' }}>Category</th>
            <th style={{ textAlign: 'left' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map(report => (
            <tr key={report.id}>
              <td style={{ textAlign: 'left' }}>{new Date(report.localDate).toLocaleDateString()}</td>
              <td style={{ textAlign: 'left' }}>{report.product.title}</td>
              <td style={{ textAlign: 'left' }}>{report.category.name}</td>
              <td style={{ textAlign: 'left' }}>${report.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default ReportsTab;