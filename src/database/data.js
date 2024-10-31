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

// ---------------------------------------------------- dummy data
export const nowOffers = [
    {
        _id: "1",
        categoryName: "Offer 1",
        categoryImage: "https://s3-ap-southeast-1.amazonaws.com/com.meenabazaronline.v1.01/homeBanner/2024/9/11/WD8XRB7Wy72S6JVX5WdX46tnMdKf3UUZQiu1GgAJ___h2xl.webp"
    },
    {
        _id: "2",
        categoryName: "Offer 2",
        categoryImage: "https://s3-ap-southeast-1.amazonaws.com/com.meenabazaronline.v1.01/homeBanner/2024/9/18/jE0UcmuWwAS03H1GHEFmUwXTkl5viCvncF2Zo5R7___h2xl.webp"
    },
    {
        _id: "3",
        categoryName: "Offer 3",
        categoryImage: "https://s3-ap-southeast-1.amazonaws.com/com.meenabazaronline.v1.01/homeBanner/2024/9/11/u4XZnBL9jKhLChiwPKLmEp5AtmQdUKgXq2hv1vWF___h2xl.webp"
    },
]

export const products = [
    {
        _id: 1,
        name: "Organic Almonds",
        categoryId: "cat001",
        subcategoryId: "subcat001",
        regularPrice: 15.99,
        price: 12.99,
        availableStock: 50,
        rating: 3.5,
        description: "Raw organic almonds, rich in nutrients and perfect for snacking.",
        brand: "Nature's Best",
        images: [
            {
                _id: 1,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-2.jpg",
                description: "Organic Almonds - Front View"
            },
            {
                _id: 2,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-2.jpg",
                description: "Organic Almonds - Packaging"
            }
        ]
    },
    {
        _id: 2,
        name: "Organic Quinoa",
        categoryId: "cat002",
        subcategoryId: "subcat001",
        regularPrice: 9.99,
        price: 7.99,
        availableStock: 100,
        rating: 4.5,
        description: "Nutritious organic quinoa, a gluten-free grain packed with protein.",
        brand: "Grain Goodness",
        images: [
            {
                _id: 3,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-2-2.jpg",
                description: "Organic Quinoa - Raw"
            },
            {
                _id: 4,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-2-2.jpg",
                description: "Organic Quinoa - Cooked"
            }
        ]
    },
    {
        _id: 3,
        name: "Whole Wheat Pasta",
        categoryId: "cat002",
        subcategoryId: "subcat002",
        regularPrice: 3.99,
        price: 2.99,
        availableStock: 80,
        rating: 4.3,
        description: "Healthy whole wheat pasta, perfect for a wholesome meal.",
        brand: "Pasta Perfection",
        images: [
            {
                _id: 5,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
                description: "Whole Wheat Pasta - Dry"
            },
            {
                _id: 6,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
                description: "Whole Wheat Pasta - Cooked"
            }
        ]
    },
    {
        _id: 4,
        name: "Extra Virgin Olive Oil",
        categoryId: "cat003",
        subcategoryId: "subcat001",
        regularPrice: 18.99,
        price: 16.99,
        availableStock: 30,
        rating: 4.7,
        description: "Premium extra virgin olive oil, perfect for cooking or dressing.",
        brand: "Mediterranean Gold",
        images: [
            {
                _id: 7,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-4-2.jpg",
                description: "Extra Virgin Olive Oil - Bottle"
            },
            {
                _id: 8,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-4-2.jpg",
                description: "Extra Virgin Olive Oil - Drizzling"
            }
        ]
    },
    {
        _id: 5,
        name: "Dark Chocolate Bar",
        categoryId: "cat004",
        subcategoryId: "subcat001",
        regularPrice: 2.99,
        price: 2.49,
        availableStock: 150,
        rating: 4.9,
        description: "Rich dark chocolate with 70% cocoa, perfect for a guilt-free treat.",
        brand: "Choco Delight",
        images: [
            {
                _id: 9,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-5-2.jpg",
                description: "Dark Chocolate Bar - Wrapper"
            },
            {
                _id: 10,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-5-2.jpg",
                description: "Dark Chocolate Bar - Close-up"
            }
        ]
    },
    {
        _id: 6,
        name: "Green Tea Bags",
        categoryId: "cat005",
        subcategoryId: "subcat001",
        regularPrice: 5.99,
        price: 4.99,
        availableStock: 200,
        rating: 4.6,
        description: "Premium organic green tea bags, rich in antioxidants.",
        brand: "Tea Harmony",
        images: [
            {
                _id: 11,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-6-2.jpg",
                description: "Green Tea Bags - Packaging"
            },
            {
                _id: 12,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-6-2.jpg",
                description: "Green Tea Bags - Brewed"
            }
        ]
    },
    {
        _id: 7,
        name: "Chia Seeds",
        categoryId: "cat001",
        subcategoryId: "subcat002",
        regularPrice: 7.99,
        price: 6.99,
        availableStock: 75,
        rating: 4.4,
        description: "High-quality chia seeds, perfect for smoothies and baking.",
        brand: "Seed Power",
        images: [
            {
                _id: 13,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-2.jpg",
                description: "Chia Seeds - Package"
            },
            {
                _id: 14,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-2.jpg",
                description: "Chia Seeds - Close-up"
            }
        ]
    },
    {
        _id: 8,
        name: "Almond Butter",
        categoryId: "cat001",
        subcategoryId: "subcat002",
        regularPrice: 8.99,
        price: 7.49,
        availableStock: 60,
        rating: 4.7,
        description: "Creamy almond butter made from organic almonds.",
        brand: "Nutty Goodness",
        images: [
            {
                _id: 15,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-2-2.jpg",
                description: "Almond Butter - Jar"
            },
            {
                _id: 16,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-2-2.jpg",
                description: "Almond Butter - Spread"
            }
        ]
    },
    {
        _id: 9,
        name: "Organic Coconut Oil",
        categoryId: "cat003",
        subcategoryId: "subcat001",
        regularPrice: 9.99,
        price: 8.99,
        availableStock: 40,
        rating: 4.8,
        description: "Cold-pressed organic coconut oil for cooking and beauty.",
        brand: "Coco Bliss",
        images: [
            {
                _id: 17,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
                description: "Coconut Oil - Bottle"
            },
            {
                _id: 18,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
                description: "Coconut Oil - Pouring"
            }
        ]
    },
    {
        _id: 10,
        name: "Herbal Tea Blend",
        categoryId: "cat005",
        subcategoryId: "subcat002",
        regularPrice: 6.99,
        price: 5.99,
        availableStock: 120,
        rating: 4.5,
        description: "A soothing blend of herbal teas for relaxation.",
        brand: "Herbal Harmony",
        images: [
            {
                _id: 19,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-4-2.jpg",
                description: "Herbal Tea Blend - Box"
            },
            {
                _id: 20,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-4-2.jpg",
                description: "Herbal Tea Blend - Brewed"
            }
        ]
    },
    {
        _id: 11,
        name: "Peanut Butter",
        categoryId: "cat001",
        subcategoryId: "subcat001",
        regularPrice: 4.99,
        price: 3.99,
        availableStock: 90,
        rating: 4.6,
        description: "Smooth and creamy peanut butter made from organic peanuts.",
        brand: "NutriSpread",
        images: [
            {
                _id: 21,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-5-2.jpg",
                description: "Peanut Butter - Jar"
            },
            {
                _id: 22,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-5-2.jpg",
                description: "Peanut Butter - Spread"
            }
        ]
    },
    {
        _id: 12,
        name: "Basmati Rice",
        categoryId: "cat002",
        subcategoryId: "subcat001",
        regularPrice: 12.99,
        price: 10.99,
        availableStock: 70,
        rating: 4.7,
        description: "Premium basmati rice, fragrant and long-grained.",
        brand: "Grain Masters",
        images: [
            {
                _id: 23,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-6-2.jpg",
                description: "Basmati Rice - Pack"
            },
            {
                _id: 24,
                url: "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-6-2.jpg",
                description: "Basmati Rice - Cooked"
            }
        ]
    }
];
