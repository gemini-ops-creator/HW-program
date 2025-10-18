import "./App.css";
import ListComponent from "./components/ListComponent";

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Strawberry",
  "Pineapple",
  "Grapes",
  "Watermelon",
  "Peach",
  "Cherry",
];

const vegetables = [
  "Carrot",
  "Tomato",
  "Cucumber",
  "Broccoli",
  "Spinach",
  "Bell Pepper",
  "Onion",
  "Potato",
  "Lettuce",
  "Corn",
];

function App() {
  return (
    <div className="App">
      <ListComponent items={fruits} title="Fruits" />

      <ListComponent items={vegetables} title="Vegetables" />
    </div>
  );
}

export default App;
