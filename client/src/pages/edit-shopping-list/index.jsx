import styles from "./editShoppingList.module.css";
import axios from "axios";

import Appbar from "../../components/Appbar";

import { useState, useEffect } from "react";
import { resolvePath, useNavigate, useParams } from "react-router-dom";

function EditShoppingList() {
    const [shoppingListName, setShoppingListName] = useState("");
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");

    const [loading, setLoading] = useState(true);

    const { shoppingListId } = useParams();
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

    const fetchShoppingList = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/shopping-list/${shoppingListId}`,
                {
                    withCredentials: true,
                }
            );

            const data = response.data;
            setShoppingListName(data.name);
            setItems(data.items);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchShoppingList();
    }, []);

    const saveShoppingList = async (e) => {
        e.preventDefault();
        console.log("Liste wird gespeichert");

        const shoppingListData = {
            name: shoppingListName,
            items: items,
            id: shoppingListId,
        };

        try {
            const response = await axios.put(
                `http://localhost:3000/shopping-list/${shoppingListId}`,
                shoppingListData,
                {
                    withCredentials: true,
                }
            );

            const data = response.data;
            console.log(data);

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    const deleteShoppingList = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(
                `http://localhost:3000/shopping-list/${shoppingListId}`,
                {
                    withCredentials: true,
                }
            );

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div>
                <h1>Wird geladen...</h1>
            </div>
        );
    }

    return (
        <div>
            <Appbar />

            <h1 className={styles["heading"]}>Edit Shopping List</h1>

            <form className={styles["form"]} onSubmit={saveShoppingList}>
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
                            className={styles["add-item-btn"]}
                            type="button"
                            onClick={addItem}
                        >
                            Add Item
                        </button>
                    </div>
                </div>

                <div className={styles["btn-container"]}>
                    <button
                        className={styles["delete-btn"]}
                        type="button"
                        onClick={deleteShoppingList}
                    >
                        Delete List
                    </button>
                    <button className={styles["save-btn"]} type="submit">
                        Save List
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditShoppingList;
