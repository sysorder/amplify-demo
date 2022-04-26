import { Storage, API} from 'aws-amplify';

//import awsconfig from "./aws-exports";
import { createTodo } from './graphql/mutations';

//Amplify.configure(awsconfig);


async function createNewTodo() {
  const fileName = "product-image-1";
  await Storage.put(fileName, image);
  const product = { name: "Product 1", description: "Black dress", price: 200, image: fileName };
  await API.graphql(graphqlOperation(createTodo, { input: product }));
}

const MutationButton = document.getElementById("MutationEventButton");
const MutationResult = document.getElementById("MutationResult");

MutationButton.addEventListener("click", (evt) => {
  createNewTodo().then((evt) => {
    MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
  });
});