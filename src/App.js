import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState('');
  const [bookList, setBookList] = useState([]);


  const addBook = () => {
    console.log("Add a book")
    Axios.post("http://localhost:3306/create", {
      name: name,
      author: author,
    }).then(() => {
      setBookList([
        ...bookList,
        {
          name: name,
          author: author,
        },
      ]);
    });
  };

  const getBooks = () => {
    Axios.get("http://localhost:3306/books").then((response) => {
      setBookList(response.data);
    });
  };

  // const updateBook = (id) => {
  //   Axios.put("http://localhost:3306/update", { wage: newWage, id: id }).then(
  //     (response) => {
  //       setBookList(
  //         bookList.map((val) => {
  //           return val.id === id
  //             ? {
  //                 id: val.id,
  //                 name: val.name,
  //                 country: val.country,
  //                 age: val.age,
  //                 position: val.position,
  //                 wage: newWage,
  //               }
  //             : val;
  //         })
  //       );
  //     }
  //   );
  // };

  const deleteBook = (id) => {
    Axios.delete(`http://localhost:3306/delete/${id}`).then((response) => {
      setBookList(
        bookList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Author:</label>
        <input
          type="text"
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        />
        
        <button onClick={addBook}>Add Book</button>
      </div>
      <div className="books">
        <button onClick={getBooks}>Show Books</button>

        {bookList.map((val, key) => {
          return (
            <div className="book">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Author: {val.author}</h3>
              </div>
              <div>
                {/* <button
                  onClick={() => {
                    updateBook(val.id);
                  }}
                >
                  {" "}
                  Update
                </button> */}

                <button
                  onClick={() => {
                    deleteBook(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
