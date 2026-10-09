import express from "express";

const app = express();

// get a list of 5 jokes
// app.get("/api/jokes", (req, res) => {
//     const jokes = [
//         {
//             id: 1,
//             title: "1st joke",
//             content: "This is the content of 1st joke"
//         },
//         {
//             id: 2,
//             title: "2nd joke",
//             content: "This is the content of 2nd joke"
//         },
//         {
//             id: 3,
//             title: "3rd joke",
//             content: "This is the content of 3rd joke"
//         },
//         {
//             id: 4,
//             title: "4th joke",
//             content: "This is the content of 4th joke"
//         },
//         {
//             id: 5,
//             title: "5th joke",
//             content: "This is the content of 5th joke"
//         }
//     ];

//     res.send(jokes);
// });


//search product by name

app.get("/api/products", (req, res) => {
    const products = [
        {
            id: 1,
            name: "wooden table",
            price: 100
        }, {
            id: 2,
            name: "pastic table",
            price: 200
        }, {
            id: 3,
            name: "iron table",
            price: 300
        },
        {
            id: 4,
            name: "wooden chair",
            price: 400
        },
        {
            id: 5,
            name: "pastic chair",
            price: 500
        }
    ];

    if (req.query.name) {
        const filteredProducts = products.filter(product =>
            product.name.includes(req.query.search)
        );
        res.send(filteredProducts);
    }

    setTimeout(() => {
        res.send(products);
    }, 3000);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
