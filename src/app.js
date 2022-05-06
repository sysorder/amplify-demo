import Amplify, { Storage, API, graphqlOperation } from "aws-amplify";

import awsconfig from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { getTodo } from "./graphql/queries";
import { listTodos } from "./graphql/queries";

Amplify.configure(awsconfig);

async function createNewTodo(file) {
  const fileName = "product-image-6";
  await Storage.put(fileName, file);
  //const result = await Storage.get('formulaOne.jpg');
   //var newLI = document.getElementById("s3url").src = result;

  const todo = { id: 12348, name: "Product 8", description: "Forumla one 008", price: 399, image: fileName };
  return await API.graphql(graphqlOperation(createTodo, { input: todo }));
}

async function getProductById () {
  const todo = await API.graphql({ query: getTodo, variables: { id: "12348" }});
  const s3Image = await Storage.get(todo.data.getTodo.image);
  todo.data.getTodo.image = s3Image;
  console.log('Hello world:', todo);
  show_image(s3Image, 300, 200, 'product 007')
}

function show_image(src, width, height, alt) {
    var imageParent = document.getElementById("displayImageSection");
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    imageParent.appendChild(img);

    //document.getElementById("s3url").src = src;
}

async function getData() {
  API.graphql(graphqlOperation(listTodos)).then((evt) => {
    evt.data.listTodos.items.map((todo, i) => {
      QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
    });
  });
}

async function listProductsWithImages () {
  const productData = await API.graphql({ query: listTodos });
  const products = await Promise.all(productData.data.listTodos.items.map(async product => {
    const image = await Storage.get(product.image)
    product.image = image
    return product
  }))
  console.log('products: ', products)
}

const MutationButton = document.getElementById("MutationEventButton");
const MutationResult = document.getElementById("MutationResult");
const QueryResult = document.getElementById("QueryResult");

MutationButton.addEventListener("click", (evt) => {
  //createNewTodo(document.getElementById("file").files[0]).then((evt) => {
    getProductById()
    //.then((evt) => {
    //MutationResult.innerHTML += `<p>${evt.data.createTodo.id} + ${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
 // });
});

//MutationButton.addEventListener("click", (evt) => {
//    createNewTodo(document.getElementById("file").files[0]).then((evt) => {
//    MutationResult.innerHTML += `<p>${evt.data.createTodo.id} + ${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
//  });
//});
