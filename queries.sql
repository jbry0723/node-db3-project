-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select ProductName, CategoryName from Product p
join Category c

on p.categoryid=c.id


-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select o.id, s.companyName, o.OrderDate from "order" o
join Shipper s
on o.shipvia=s.id

where o.OrderDate < '2012-08-09'
 

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select o.Quantity, p.Productname from "orderdetail" o
join Product p
on o.ProductId=p.ID

where o.Orderid='10251'


-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select o.id as Order_id,c.CompanyName as Customer_Company, e.LastName as Employee_Last_Name  from "order" o
join Employee e
on o.EmployeeId=e.Id
join Customer c
on o.CustomerId=c.id