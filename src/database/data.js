export const categories = [
    {
        _id: "1",
        categoryName: "Electronics",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "2",
        categoryName: "Clothing",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "3",
        categoryName: "Books",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "4",
        categoryName: "Home & Kitchen",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "5",
        categoryName: "Sports & Outdoors",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "6",
        categoryName: "Beauty & Personal Care",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "7",
        categoryName: "Toys & Games",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "8",
        categoryName: "Automotive",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "9",
        categoryName: "Health & Household",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    },
    {
        _id: "10",
        categoryName: "Tools & Home Improvement",
        categoryImage: "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?t=st=1715595136~exp=1715598736~hmac=6e3937b54c6e630fbda4e459df5ff7b7d6c22b9dcf81548a146e82d5a7cab40c&w=740"
    }
];

export const sidebarMenus = {
    role: "System Admin",
    features: [
        {
            name: "Dashboard",
            sidebarIcon: "MdDashboard",
            index: 1,
            path: "dashboard-home",
            subFeatures: []
        },
        {
            name: "Website Content",
            sidebarIcon: "IoMdPerson",
            index: 2,
            subFeatures: [
                {
                    name: "Banner Management",
                    path: "banner-management",
                    index: 1
                },
                {
                    name: "Ads Management",
                    path: "ads-management",
                    index: 2
                },
                {
                    name: "Blog Management",
                    path: "blog-management",
                    index: 3
                },
            ]
        },
        {
            name: "Ecommerce",
            sidebarIcon: "IoMdPerson",
            index: 3,
            subFeatures: [
                {
                    name: "Add Product",
                    path: "add-product",
                    index: 1
                },
                {
                    name: "Product List",
                    path: "product-list",
                    index: 2
                },
            ]
        },
        {
            name: "Category",
            sidebarIcon: "IoMdPerson",
            index: 4,
            subFeatures: [
                {
                    name: "New Category",
                    path: "new-category",
                    index: 1
                },
                {
                    name: "Category List",
                    path: "category-list",
                    index: 2
                },
            ]
        },
        {
            name: "Subcategory",
            sidebarIcon: "IoMdPerson",
            index: 5,
            subFeatures: [
                {
                    name: "New Subcategory",
                    path: "new-subcategory",
                    index: 1
                },
                {
                    name: "Subcategory List",
                    path: "subcategory-list",
                    index: 2
                },
            ]
        },
        {
            name: "Order",
            sidebarIcon: "MdDashboard",
            index: 6,
            path: "order",
            subFeatures: []
        },
        {
            name: "Promo Codes",
            sidebarIcon: "MdDashboard",
            index: 7,
            path: "promo-codes",
            subFeatures: []
        },
        {
            name: "Customers",
            sidebarIcon: "MdDashboard",
            index: 8,
            path: "customers",
            subFeatures: []
        },
        {
            name: "Subcategory",
            sidebarIcon: "IoMdPerson",
            index: 9,
            subFeatures: [
                {
                    name: "Create Role",
                    path: "create-role",
                    index: 1
                },
                {
                    name: "All Roles",
                    path: "all-roles",
                    index: 2
                },
            ]
        },
        {
            name: "Subscription",
            sidebarIcon: "MdDashboard",
            index: 10,
            path: "subscription",
            subFeatures: []
        },
        {
            name: "Message",
            sidebarIcon: "MdDashboard",
            index: 11,
            path: "message",
            subFeatures: []
        },
    ]
}