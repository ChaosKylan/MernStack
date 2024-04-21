import styles from "./newShoppingList.module.css";
import axios from "axios";

import Appbar from "../../components/Appbar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewShoppingList() {
    const [shoppingListName, setShoppingListName] = useState("");
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");

    const navigate = useNavigate();

    const addItem = (e) => {
        e.preventDefault();

        if (itemName.trim() !== "") {
            setItems([...items, itemName.trim()]);
            return setItemName("");
        }
    };

    const editItem = (index, newItemName) => {
        const itemsCopy = [...items];
        itemsCopy[index] = newItemName;
        return setItems(itemsCopy);
    };

    const deleteItem = (index) => {
        const itemsCopy = [...items];
        itemsCopy.splice(index, 1);
        setItems(itemsCopy);
    };

    const handleSaveList = async (e) => {
        e.preventDefault();

        const data = {
            name: shoppingListName,
            items: items,
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/shopping-list/create",
                data,
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Appbar />

            <h1 className={styles["heading"]}>New Shopping List</h1>

            <form className={styles["form"]} onSubmit={handleSaveList}>
                <div>
                    <label htmlFor="shoppingListName">Shopping List Name</label>
                    <div className={styles["input-wrapper"]}>
                        <input
                            type="text"
                            id="shoppingListName"
                            value={shoppingListName}
                            className={styles["input"]}
                            onChange={(e) =>
                                setShoppingListName(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>

                <div>
                    <h2 className={styles["heading-2"]}>Add items</h2>

                    <ul className={styles["list"]}>
                        {items.map((item, index) => (
                            <li key={index} className={styles["list-item"]}>
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) =>
                                        editItem(index, e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => deleteItem(index)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className={styles["add-item-wrapper"]}>
                        <div className={styles["add-item-container"]}>
                            <label htmlFor="itemName">Item Name</label>
                            <div className={styles["input-wrapper"]}>
                                <input
                                    type="text"
                                    id="itemName"
                                    value={itemName}
                                    className={styles["input"]}
                                    onChange={(e) =>
                                        setItemName(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addItem(e);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={addItem}
                            className={styles["add-item-btn"]}
                        >
                            Add Item
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles["save-list-btn"]}>
                    Save List
                </button>
            </form>
        </div>
    );
}

export default NewShoppingList;
