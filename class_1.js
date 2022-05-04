const products = [
    {
        productId: 1,
        name: "headphones",
        typeOfProduct: 1,
        price: 100,
    },
    {
        productId: 2,
        name: "Shoes Nike",
        typeOfProduct: 2,
        price: 300,
    },
    {
        productId: 3,
        name: "hamburger",
        typeOfProduct: 3,
        price: 10,
    },
    {
        productId: 4,
        name: "Fries",
        typeOfProduct: 3,
        price: 5,
    },
    {
        productId: 5,
        name: "Sandwich",
        typeOfProduct: 3,
        price: 10,
    },
    {
        productId: 6,
        name: "laptop",
        typeOfProduct: 1,
        price: 100,
    },
    {
        productId: 7,
        name: "keyboard",
        typeOfProduct: 1,
        price: 50,
    },
    {
        productId: 8,
        name: "t-shirt",
        typeOfProduct: 2,
        price: 16,
    },
];

const typeOfProducts = [
    { id: 1, name: "Electronic" },
    { id: 2, name: "Clothes" },
    { id: 3, name: "Food" }
];

export const discountsHolyDays = [
    { typeOfProduct: 1, discountApply: true, value: 10 },
    { typeOfProduct: 2, discountApply: false, value: 0 },
    { typeOfProduct: 3, discountApply: true, value: 30 },
];

// Functions

const isAlready = (product) => {
    const isAlready = products.find(prod => prod.productId === product.productId)
    if (isAlready) throw new Error("Producto repetido")
}

const validateType = (product) => {
    const type = typeOfProducts.find(tp => tp.name === product.typeOfProcuct)
    if (!type) throw new Error("El tipo del producto no existe")
}

const addProduct = (newProduct) => {
    try {

        newProduct.productId = newProduct.id
        delete newProduct.id

        isAlready(newProduct)
        validateType(newProduct)

        products.push({ ...newProduct })

    } catch (error) {
        return {
            id: newProduct.productId,
            status: 'error',
            message: error
        }
    }

    return {
        id: newProduct.productId,
        status: 'succes',
        message: '¡Registro exitoso!'
    }
}


//// Activity

// cada solución debe de crearse con metodo que retorne el resultado esperado de cada punto
// y su llamda del metodo con un console.log donde muestre la información

/// 1 - ¿Cuál es el promedio de valor de cada tipo de producto?

let avgForTypeOfProduct = typeOfProducts.reduce((prev, current) => ({
    ...prev, [current.name]: {
        sum: 0,
        count: 0,
        avg: 0
    }
}), {})

products.forEach(product => {
    const nameTypeProduct = typeOfProducts.find(tp => tp.id === product.typeOfProduct)?.name;
    if (nameTypeProduct) {
        avgForTypeOfProduct[nameTypeProduct].count++;
        avgForTypeOfProduct[nameTypeProduct].sum += product.price;
        avgForTypeOfProduct[nameTypeProduct].avg = avgForTypeOfProduct[nameTypeProduct].sum / avgForTypeOfProduct[nameTypeProduct].count;
    }
})

Object.keys(avgForTypeOfProduct).forEach(key => {
    console.log(`Promedio por tipo = ${avgForTypeOfProduct[key].avg}`);
})


/// 2 - ¿Cuál es el producto más costoso de cada categoria?

const moreExpensiveForTypeOfProduct = typeOfProducts.reduce((prev, current) => ({
    ...prev, [current.name]: {
        productId: 0,
        price: 0
    }
}), {})

products.forEach(product => {
    const nameTypeProduct = typeOfProducts.find(tp => tp.id === product.typeOfProduct)?.name;
    if (nameTypeProduct && product.price > moreExpensiveForTypeOfProduct[nameTypeProduct].price) {
        moreExpensiveForTypeOfProduct[nameTypeProduct].productId = product.productId;
        moreExpensiveForTypeOfProduct[nameTypeProduct].price = product.price;
    }
});

Object.keys(moreExpensiveForTypeOfProduct).forEach(key => {
    console.log(`Más costoso ${key} = ${moreExpensiveForTypeOfProduct[key].productId}`);
});

/// 3 - ¿Exite algún producto de tipo Electronico que cueste $100?

const existAppliancesWorth100 = products.some(product => product.price === 100 && typeOfProducts.find(tp =>
    tp.id === product.typeOfProduct).name.includes("Electronic")
);

console.log(existAppliancesWorth100);

/// 4 - Obtener todos los productos que en nombre tengan las letra S.

const productsWithS = products.filter(product => product.name.includes("S"))

productsWithS.forEach(product => {
    console.log(`${product.name}`);
});

/// 5 - Crear un arreglo de objetos con la siguiente información: { productId: 7 ,nameProduct: 'keyboard', typeOfProduct: 'Electronic', discount: '10', applyDiscount: true}



const newProductList_1 = products.map(product => {

    const { name, price, ...restProduct } = product;

    return {
        ...restProduct,
        nameProduct: name,
        discount: '10',
        applyDiscount: true
    }
})

console.log(newProductList_1);


/// 6. Crear un arreglo de objetos con la siguiente información: { productId: 7, priceWithDiscount: 45}

const newProductList_2 = products.map(product => {

    const { productId, price } = product;

    return {
        productId,
        priceWithDiscount: price * 0.45
    }
})

console.log(newProductList_2);


// 7. Agregar los siguientes productos, y crear un arreglo con el resultado, ejemplo: [{id: 9, status: 'succes', id:10: status: 'error': message: 'error message'}];

const newProducts = [
    {
        id: 9,
        name: 'Tucson',
        typeOfProcuct: 'Car',
        discount: 10,
    }, {
        id: 10,
        name: 'Jeep',
        typeOfProcuct: 'Car',
        discount: 10,
    }, {
        id: 10,
        name: 'Screen',
        typeOfProcuct: 'Electronic'
    }, {
        id: 1,
        name: 'Mouse',
        typeOfProcuct: 'Electronic'
    }
]

const logResult = newProducts.map(product => {
    return addProduct(product)
})

console.log(logResult);

logResult.forEach(product => {
    console.log(product.status)
    console.log(product.message)
})

products.forEach(product => {
    console.log(product.productId)
})



