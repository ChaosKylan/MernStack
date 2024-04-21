import styles from "./dashboard.module.css";
import axios from "axios";

import { useState } from "react";

import Appbar from "../../components/Appbar";
import ShoppingListCard from "../../components/ShoppingListCard";

import { useEffect } from "react";

function Dashboard() {
    const [shoppingLists, setShoppingLists] = useState([]);

    const fetchShoppingLists = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/shopping-list",
                {
                    withCredentials: true,
                }
            );

            const data = response.data;

            setShoppingLists(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchShoppingLists();
    }, []);

    return (
        <div>
            <Appbar />

            <div className={styles["wrapper"]}>
                {shoppingLists.map((list) => (
                    <ShoppingListCard key={list._id} {...list} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
